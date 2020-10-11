const { Router, request } = require("express");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const router = Router();
const { Submission, Challenge, Review } = require("../../../models");

router.get("/top-challenges", async (req, res) => {
  const sub = await Submission.findAll({
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("challenge_id")), "countSub"],
      ],
    },
    include: {
      model: Challenge,
      attributes: ["name"]
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

router.get("/challenges-category", async (req, res) => {
  const challengeType = await Challenge.findAll({
    attributes: [
      "category",
      [sequelize.fn("COUNT", sequelize.col("type")), "countCategory"],
    ],
    group: ["category"],
    order: [[sequelize.fn("COUNT", sequelize.col("category")), "DESC"]],
    limit: 10,
  });
  res.json(challengeType);
});

router.get("/sub-by-date", async (req, res) => {
  const subByDate = await Submission.findAll({
    group: [sequelize.fn("DAY", sequelize.col("createdAt"))],
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("id")), "countByDay"],
      "createdAt",
    ],
    where: {
      created_at: {
        //432000000
        [Op.gte]: new Date(Date.now() - 2.628e+9),
      },
    },
  });
  res.json(subByDate);
});

router.get("/challenges-by-reviews", async (req, res) => {

  let allChallenges = await Review.findAll({
    attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'ratingAVG']],
    include: {
      model: Challenge,
    },
    group: ['challenge_id'],
    order: [[sequelize.fn('AVG', sequelize.col('rating')), 'DESC']],
    limit: 5
  })

  allChallenges = allChallenges.map(element => {

    element.dataValues.ratingAVG = Number(element.dataValues.ratingAVG)
    return element

  });

  res.json(allChallenges)
});

module.exports = router;
