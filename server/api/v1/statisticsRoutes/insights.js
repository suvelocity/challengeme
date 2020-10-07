const { Router } = require("express");
const sequelize = require("sequelize");
const router = Router();
const { Submission, Challenge } = require("../../../models");

router.get("/top-challenges", async (req, res) => {
  const sub = await Submission.findAll({
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("challenge_id")), "count_sub"],
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
        [sequelize.fn("COUNT", sequelize.col("challenge_id")), "countSuc"],
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

module.exports = router;
