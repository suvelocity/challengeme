const { Router } = require("express");
const router = Router();
const sequelize = require("sequelize");
const { Submission, Challenge, User } = require("../../../models");

router.get("/top-users", async (req, res) => {
  const topUsers = await Submission.findAll({
    attributes: {
      include: [[sequelize.fn("COUNT", sequelize.col("user_id")), "countUser"]],
    },
    include: {
      model: User,
      attributes: ["userName"],
    },
    group: ["user_id"],
    order: [[sequelize.fn("COUNT", sequelize.col("user_id")), "DESC"]],
    limit: 10,
  });
  res.json(topUsers);
});

module.exports = router;
