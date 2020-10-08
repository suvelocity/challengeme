const { Router } = require("express");
const sequelize = require("sequelize");
const router = Router();
const { Submission, Challenge } = require("../../../models");

router.get("/top-challenges", async (req, res) => {
  const sub = await Submission.findAll({
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("challenge_id")), "countSub"],
      ],
    },
    include: {
      model: Challenge,
      attributes: ["name"],
    },
    group: ["challenge_id"],
    order: [[sequelize.fn("COUNT", sequelize.col("challenge_id")), "DESC"]],
    limit: 10,
  });

  res.json(sub);
});

router.get("/top-success", async (req, res) => {
  const sub = await Submission.findAll({
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("challenge_id")), "countSub"],
      ],
    },
    include: {
      model: Challenge,
      attributes: ["name"],
    },
    where: { state: "SUCCESS" },
    group: ["challenge_id"],
    order: [[sequelize.fn("COUNT", sequelize.col("challenge_id")), "DESC"]],
    limit: 10,
  });

  res.json(sub);
});

router.get("/challenges-type", async (req, res) => {
  const challengeType = await Challenge.findAll({
    attributes: ['type', [sequelize.fn("COUNT", sequelize.col("type")), "countType"]],
    group: ["type"],
    order: [[sequelize.fn("COUNT", sequelize.col("type")), "DESC"]],
    limit: 10,
  });
  res.json(challengeType);
});

router.get("/sub-by-date", async (req, res) => {
  Submission.findAll({
    group:[sequelize.fn('date_trunc', 'day', sequelize.col('created_at'))],
    attributes:[Sequelize.fn('COUNT', Sequelize.col('id'))],
    where: {
      created_at: {
        [Op.gte]: moment().subtract(5, 'days').toDate()
      }
    }
  })
  res.json(challengeType);
});

module.exports = router;
