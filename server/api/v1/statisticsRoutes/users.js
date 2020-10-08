

// SELECT users.id, submissions.state, submissions.created_at, COUNT(submissions.id)
// FROM `submissions` 
// JOIN users
// ON users.id = submissions.user_id
// WHERE user_id=7 AND
// DATE(submissions.created_at) > (NOW() -INTERVAL 7 DAY)
// GROUP BY submissions.state


const { Router } = require("express");
const router = Router();
const sequelize = require("sequelize");
const { Submission, Challenge, User } = require("../../../models");
const { Op } = require("sequelize");

router.get("/top-users", async (req, res) => {
  const topUsers = await Submission.findAll({
    attributes: {
      include: [[sequelize.fn("COUNT", sequelize.col("user_id")), "countSub"]],
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


router.get("/user-success", async (req, res) => {
  let loggedUser = req.user.userId ? req.user.userId : 7
  const subBySuccess = await Submission.findAll({
    group: ["state"],
    attributes: [
      "id",
      "state",
      "createdAt",
      [sequelize.fn("COUNT", sequelize.col("user_id")), "CountByUserID"]
    ],
    include: [
      {
        model: User,
        attributes: ["id"],
      }
    ],
    where: {
    [Op.and]: [{userId: loggedUser}, {[Op.or]: [{ state: "SUCCESS" }, { state: "FAIL" }]}],
    
    },
  });
  res.json(subBySuccess);
});



router.get("/sub-by-date", async (req, res) => {
  let loggedUser = req.user.userId ? req.user.userId : 7
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

router.get("/stronger-side", async(req, res) => {
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

// attributes: [
//   "id",
//   "state",
//   "createdAt",
//   [sequelize.fn("COUNT", sequelize.col("user_id")), "CountByUserID"]
// ],

// where: {
//   [Op.and]: [
//     {
//       userId: loggedUser
//     }, {[Op.or]: [{ state: "SUCCESS" }, { state: "FAIL" }]}
//   ],
  
module.exports = router;
