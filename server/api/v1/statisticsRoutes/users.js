const { Router } = require("express");
const router = Router();
const sequelize = require("sequelize");
const { Submission, Challenge, User } = require("../../../models");
const { Op } = require("sequelize");

// returns the 5 users with the most successful submissions
router.get("/top-users", async (req, res) => {
  try {
    const topUsers = await Submission.findAll({
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("user_id")), "countSub"],
        ],
      },
      include: {
        model: User,
        attributes: ["userName"],
      },
      where: { state: "SUCCESS" },
      group: ["user_id"],
      order: [[sequelize.fn("COUNT", sequelize.col("user_id")), "DESC"]],
      limit: 5,
    });
    res.json(topUsers);
  } catch (err) {
    res.status(400).send(err);
  }
});

// only for the logged in user

// returns the amount of successful and failed submissions from all submissions
router.get("/user-success", async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 1;
    const subBySuccess = await Submission.findAll({
      group: ["state"],
      attributes: [
        "id",
        "state",
        "createdAt",
        [sequelize.fn("COUNT", sequelize.col("user_id")), "CountByUserID"],
      ],
      // include: [
      //   {
      //     model: User,
      //     attributes: ["id", "userName"],
      //   },
      // ],
      where: {
        [Op.and]: [
          { userId: loggedUser },
          { [Op.or]: [{ state: "SUCCESS" }, { state: "FAIL" }] },
        ],
      },
    });
    res.json([subBySuccess, req.user.userName]);
  } catch (err) {
    res.status(400).send(err);
  }
});

// returns the submissions per day from the last 5 days
router.get("/sub-by-date", async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 1;
    const fiveDays = 5 * 24 * 60 * 60 * 1000;
    const subByDate = await Submission.findAll({
      group: [sequelize.fn("DAY", sequelize.col("created_at"))],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("id")), "CountSubByDate"],
        "createdAt",
      ],
      where: {
        created_at: {
          [Op.gte]: new Date(Date.now() - fiveDays),
        },
        userId: loggedUser,
      },
    });

    res.json(subByDate);
  } catch (err) {
    res.status(400).send(err);
  }
});

// returns the count of submissions with the same challenge type
router.get("/sub-by-type", async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 1;
    const subByType = await Submission.findAll({
      include: [
        {
          model: Challenge,
          attributes: [
            "id",
            "type",
            "name",
            [sequelize.fn("COUNT", sequelize.col("type")), "CountByType"],
          ],
        },
      ],
      group: ["type"],
      where: {
        userId: loggedUser,
      },
    });
    res.json(subByType);
  } catch (err) {
    res.status(400).send(err);
  }
});

// returns the count of unsolved challenges
router.get("/unsolved-challenges", async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 3;
    // gets user submissions grouped by challenge id
    const userSubmissions = await Submission.findAll({
      group: ["challenge_id"],
      attributes: ["challenge_id"],
      where: {
        userId: loggedUser,
      },
    });

    // returns an array of the challenges id that has been submitted
    const submittedChallenges = userSubmissions.map((challenge) => {
      return challenge.challenge_id;
    });

    // gets all the challenges that the user didn't submit
    const unsolvedChallenges = await Challenge.findAll({
      attributes: ["name", "type", "repositoryName"],
      where: {
        id: { [Op.notIn]: submittedChallenges },
      },
    });

    res.json(unsolvedChallenges);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
