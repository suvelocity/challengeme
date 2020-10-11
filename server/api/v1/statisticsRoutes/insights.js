const { Router } = require("express");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const router = Router();
const { Submission, Challenge, Review } = require("../../../models");

// returns the 5 challenges with most submitions
router.get("/top-challenges", async (req, res) => {
  try{
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
      limit: 5,
    });
  
    res.json(sub);
  }catch(err){
    res.json(err)
  }
});

// returns the 5 challenges with most successful submitions
router.get("/top-success", async (req, res) => {
  try{
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
      limit: 5,
    });
    res.json(sub);
  }catch(err){
    res.json(err)
  }
});

// returns the count of challenges from same type('type name' + 'count')
<<<<<<< Updated upstream
router.get("/challenges-type", async (req, res) => {
  const challengeType = await Challenge.findAll({
    attributes: [
      "type",
      [sequelize.fn("COUNT", sequelize.col("type")), "countType"],
    ],
    group: ["type"],
    order: [[sequelize.fn("COUNT", sequelize.col("type")), "DESC"]],
    limit: 5,
  });
  res.json(challengeType);
=======
router.get("/challenges-category", async (req, res) => {
  try{
    const challengeType = await Challenge.findAll({
      attributes: [
        "category",
        [sequelize.fn("COUNT", sequelize.col("type")), "countCategory"],
      ],
      group: ["category"],
      order: [[sequelize.fn("COUNT", sequelize.col("category")), "DESC"]],
      limit: 5,
    });
    res.json(challengeType);
  }catch(err){
    res.json(err)
  }
>>>>>>> Stashed changes
});

// returns the count of submitions submited per day from the last 5 days 
router.get("/sub-by-date", async (req, res) => {
  try{
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
  }catch(err){
    res.json(err)
  }
});

// returns top 5 challenges ordered by rating averge (from reviews) 
router.get("/challenges-by-reviews", async (req, res) => {
try{
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
}catch(err){
  res.json(err)
}
});

module.exports = router;
