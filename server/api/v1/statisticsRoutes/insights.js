const { Router } = require("express");
const router = Router();
const { Submission, Challenge, sequelize } = require("../../../models");
//

router.get("/top-challenges", async (req, res) => {
  const sub = await Submission.findAll({
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("challenge_id")), "n_sub"],
      ],
    },
    include: {
      model: Challenge,
      attributes: ["name"],
    },
    order: [sequelize.fn("COUNT", sequelize.col("challenge_id"))],
    limit: 10,
  });
  res.json(sub);
});

module.exports = router;
