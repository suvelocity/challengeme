const { Router } = require('express');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const router = Router()

const { Submission, Teams, User, Challenge } = require('../../../models');

// returns the 5 teams with the most successfull submissions
router.get('/top', async (req, res) => {
  try{
    const topTeam = await Teams.findAll({
      // raw:true,
      group: ["id"],
      attributes: ['id','name'],
      include:[
        {
          model:User,
          attributes:['userName'],
          through:{
            attributes:[]
          },
          include:{
            model: Submission,
            attributes:[[sequelize.fn("COUNT", sequelize.col("challenge_id")), "teamSuccessSubmissions"]],
            where:{
              state:'success'
            },
          }
        }
      ],
      order: [[sequelize.fn("COUNT", sequelize.col("challenge_id")), 'DESC']]
    })

    res.send(topTeam.slice(0, 5))
  }catch(err){
    res.status(400).send(err)
  }
  })


// for the team related to the logged in user

// returns the 5 users with most successfull submissions in the team
router.get('/top-user', async (req, res) => {
  try{
    // let loggedUser = req.user.userId ? req.user.userId : 1
    const userTeam= await User.findOne({
      where:{
        id: 1
      },
      include:[
        {
          model:Teams,
          through:{
            attributes:[]
          }
        }
      ]
    })
    const teams = await Teams.findByPk(userTeam.Teams[0].id)
    const users = await teams.getUsers({
      raw:true,
      group:["id"],
      attributes:["id", "firstName", "lastName"],
      include:[
        {
        model:Submission,
        attributes:[[sequelize.fn("COUNT", sequelize.col("challenge_id")), "userSuccessSubmission"]],
        where:{
          state:'success'
        }
        }
      ],
      order: [[sequelize.fn("COUNT", sequelize.col("challenge_id")), 'DESC']],
<<<<<<< Updated upstream
=======
<<<<<<< HEAD

=======
>>>>>>> 36a1dbc81367b0301a8a2fb39440e4d043749d4d
>>>>>>> Stashed changes
    })
    users.forEach(element => {
      delete element["UsersTeams.teamId"]
      delete element["UsersTeams.userId"]
      delete element["UsersTeams.createdAt"]
      delete element["UsersTeams.updatedAt"]
      delete element["UsersTeams.TeamId"]
      delete element["UsersTeams.UserId"]
    })
    res.send(users.slice(0, 5))
  }catch(err){
    res.status(400).send(err)
  }
})

// returns last week submissions  for the logged in user team
router.get('/last-week-submissions', async (req, res) => {
  try{
    // let loggedUser = req.user.userId ? req.user.userId : 1
    const userTeam= await User.findOne({
      where:{
        id: 1
      },
      include:[
        {
          model:Teams,
          through:{
            attributes:[]
          }
        }
      ]
    })

    const currentTeam= await Teams.findOne({
      where:{
        id:userTeam.Teams[0].id
      },
      attributes:["name"],
      include:[{
        model:User,
        attributes:["id"],
        through:{
          attributes:[]
        }
      }]
    })

    usersId = currentTeam.Users.map(value=>value.id)

    const team = await Submission.findAll({
      raw:true,
      group:[sequelize.fn("DAY", sequelize.col("Submission.created_at"))],
      attributes: [[sequelize.fn("COUNT", "id"), "dateSubmissions"],"createdAt"],
      where:{
        state:'SUCCESS',
        created_at: {
          [Op.gte]: new Date(Date.now() - 604800000),
        },
        userId:usersId
      },
      order:[[sequelize.fn("DAY", sequelize.col("Submission.created_at")),"desc"]]
    })
    res.send(team)
  }catch(err){
    res.status(400).send(err)
  }
})

// returns the teams submissions status(total amount, pending, success, fail)
router.get("/team-submissions", async (req, res) => {
  try{
   // let loggedUser = req.user.userId ? req.user.userId : 1
  const userTeam= await User.findOne({
    where:{
      id: 1
    },
    include:[
      {
        model:Teams,
        through:{
          attributes:[]
        }
      }
    ]
  })

  const currentTeam= await Teams.findOne({
    where:{
      id:userTeam.Teams[0].id
    },
    attributes:["name"],
    include:[{
      model:User,
      attributes:["id"],
      through:{
        attributes:[]
      }
    }]
  })

  usersId = currentTeam.Users.map(value=>value.id)

  const successSub = await Submission.findAll({
    attributes:[[sequelize.fn("COUNT", sequelize.col("id")), "teamSuccessSubmissions"]],
    where:{
      userId:usersId,
      state:'success'
    }
  })
  const failSub = await Submission.findAll({
    attributes:[[sequelize.fn("COUNT", sequelize.col("id")), "teamFailSubmissions"]],
    where:{
      userId:usersId,
      state:'fail'
    }
  })
  const pendingSub = await Submission.findAll({
    attributes:[[sequelize.fn("COUNT", sequelize.col("id")), "teamPendingSubmissions"]],
    where:{
      userId:usersId,
      state:'pending'
    }
  })

  const succes = successSub[0].dataValues.teamSuccessSubmissions;
  const fail = failSub[0].dataValues.teamFailSubmissions;
  const pending = pendingSub[0].dataValues.teamPendingSubmissions;
  const allSub= succes+fail+pending

  const teamSubmissions={
    all:allSub,
    success:succes,
    fail:fail,
    pending:pending
  }
  res.json(teamSubmissions);
}catch(err){
  res.json(err)
}
});

// returns the top 5 challenges, with the most successful submissions in the team 
router.get('/success-challenge', async (req, res) => {
  try{
     // let loggedUser = req.user.userId ? req.user.userId : 1
    const userTeam= await User.findOne({
      where:{
        id: 1
      },
      include:[
        {
          model:Teams,
          through:{
            attributes:[]
          }
        }
      ]
    })

    const currentTeam= await Teams.findOne({
      where:{
        id:userTeam.Teams[0].id
      },
      attributes:["name"],
      include:[{
        model:User,
        attributes:["id"],
        through:{
          attributes:[]
        }
      }]
    })

    usersId = currentTeam.Users.map(value=>value.id)

    const teamChallenges = await Submission.findAll({
      group:["challengeId"],
      attributes: [[sequelize.fn("COUNT", "challengeId"), "challengeSuccesses"],"challengeId"],
      where:{
        state:'SUCCESS',
        userId:usersId
      },
      include:[{
        model:Challenge,
        attributes:["name"]
      }],
      order: [[sequelize.fn("COUNT", "challengeId"), 'DESC']],
      limit: 5
    })

    res.send(teamChallenges)
  }catch(err){
    res.status(400).send(err)
  }
  })

module.exports = router;


