

const { Router } = require("express");
const router = Router();
const sequelize = require("sequelize");
const { Submission, Challenge, User } = require("../../../models");
const { Op } = require("sequelize");

// returns the 5 users with the most successfull submissions
router.get("/top-users", async (req, res) => {
  const topUsers = await Submission.findAll({
    attributes: {
      include: [[sequelize.fn("COUNT", sequelize.col("user_id")), "countSub"]],
    },
    include: {
      model: User,
      attributes: ["userName"],
    },
    where: {state: "SUCCESS"},
    group: ["user_id"],
    order: [[sequelize.fn("COUNT", sequelize.col("user_id")), "DESC"]],
    limit: 5,
  });
  res.json(topUsers);
});


// only for the logged in user

// returns the amount of successfull and failed submissions from all submissions
router.get("/user-success", async (req, res) => {
  let loggedUser = req.user ? req.user.userId : 1
  const subBySuccess = await Submission.findAll({
    group: ["state"],
    attributes: [
      "id",
      "state",
      "createdAt",
      [sequelize.fn("COUNT", sequelize.col("user_id")), "CountSuccessByUser"]
    ],
    include: [
      {
        model: User,
        attributes: ["id", "userName"],
      }
    ],
    where: {
    [Op.and]: [{userId: loggedUser}, {[Op.or]: [{ state: "SUCCESS" }, { state: "FAIL" }]}],
    },
  });
  res.json(subBySuccess);
});

// returns the submissions per day from the last 5 days
router.get("/sub-by-date", async (req, res) => {
  let loggedUser = req.user ? req.user.userId : 1
  const subByDate = await Submission.findAll({
    group: [sequelize.fn("DAY", sequelize.col("created_at"))],
    attributes: [
      
      [sequelize.fn("COUNT", sequelize.col("id")), "CountSubByDate"],
      "createdAt",
    ],
    where: {
      created_at: {

      [Op.gte]: new Date(Date.now() - 432000000),
    },
    userId: loggedUser
    },
  });
  
  res.json([subByDate, req.user]);
});




// returns the count of submissions with the same challenge type
  router.get("/sub-by-type", async(req, res) => {
  let loggedUser = req.user ? req.user.userId : 1
  const subByType = await Submission.findAll({
    include: [
      {
        model: Challenge,
        attributes: [
          "id", 
          "type", 
          "name",
          [sequelize.fn("COUNT", sequelize.col("type")), "CountByType"]
        ],
        

      }
    ],
    group: ["type"],
    where: {
      userId: loggedUser
    },    
  })
  res.json(subByType)
})

// returns the count of unsolved challenges
router.get("/unsolved-challenges", async(req, res) => {
  let reqUser = req.user ? req.user : {id: 3, userName: "boosty"}

  let loggedUser = req.user ? req.user.userId : 3
  const userSubmissions = await Submission.findAll({

    group:["challenge_id"],
    attributes: [
      "challenge_id"
    ],
    where: {
      userId: loggedUser
    }
  })

  const solvedChallenges = userSubmissions.map(challenge => {
    return challenge.challenge_id
  })

  const unsolvedChallenges = await Challenge.findAll({
    attributes: ['name', 'type', 'repositoryName'],
      where: {
      id: {[Op.notIn]: solvedChallenges}
  }})

  res.json([unsolvedChallenges, {User: reqUser}])
})


module.exports = router;
