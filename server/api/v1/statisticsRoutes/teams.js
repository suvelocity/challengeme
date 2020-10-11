const { Router } = require('express');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const router = Router()

const { Submission, Teams, User, Challenge } = require('../../../models');


router.get('/top', async (req, res) => {
  try{
    const topTeam = await Teams.findAll({
      raw:true,
      group: ["id"],
      attributes: ['id','name'],
      include:[
        {
          model:User,
          attributes:[],
          through:{
            attributes:[]
          },
          include:{
            model: Submission,
            attributes:[[sequelize.fn("COUNT", sequelize.col("challenge_id")), "teamSuccessSubmissions"]],
            where:{
              state:'success'
            }
          }
        }
      ]
    })

    res.send(topTeam)
  }catch(err){
    res.status(400).send(err)
  }
  })

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
      ]
    })
    users.forEach(element => {
      delete element["UsersTeams.teamId"]
      delete element["UsersTeams.userId"]
      delete element["UsersTeams.createdAt"]
      delete element["UsersTeams.updatedAt"]
      delete element["UsersTeams.TeamId"]
      delete element["UsersTeams.UserId"]
    })
    res.send(users)
  }catch(err){
    res.status(400).send(err)
  }
})

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
    // const team = await Submission.findAll({
    //   raw:true,
    //   group:[sequelize.fn("DAY", sequelize.col("Submission.created_at"))],
    //   attributes: [[sequelize.fn("COUNT", "id"), "dateSubmissions"],"createdAt"],
    //   where:{
    //     state:'SUCCESS',
    //     created_at: {
    //       [Op.gte]: new Date(Date.now() - 604800000),
    //     }
    //   },
    //   include:[{
    //     model: User,
    //     attributes:["id"],
    //     include:[{
    //       model: Teams,
    //       through:{
    //         attributes:[]
    //       },
    //       attributes:["id","name"],
    //       where:{
    //         id:userTeam.Teams[0].id
    //       }
    //     }]
    //   }],

    // })

    const team = await Teams.findAll({
      // raw:true,
      attributes: ['id','name',[sequelize.fn("COUNT", "submissions.id"), "teamSubmissions"]],
      where:{
        id: userTeam.Teams[0].id
      },
      include:[
        {
          model:User,
          through:{
            attributes:[]
          },
          attributes:[],
          include:{
            model: Submission,
            group:[sequelize.fn("DAY", sequelize.col("Submission.created_at"))],
            attributes:[],
            where:{
              state:'SUCCESS',
              created_at: {
                [Op.gte]: new Date(Date.now() - 604800000),
              }
            }
          }
        }
      ]
    })
    res.send(team)
  }catch(err){
    res.status(400).send(err)
  }
})

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
  const successSub = await Teams.findAll({
    group: ["id"],
    attributes: ['id','name'],
    where:{
      id:userTeam.Teams[0].id
    },
    include:[
      {
        model:User,
        attributes:["id"],
        through:{
          attributes:[]
        },
        include:{
          model: Submission,
          attributes:[[sequelize.fn("COUNT", sequelize.col("challenge_id")), "teamSuccessSubmissions"]],
          where:{
            state:'success'
          }
        }
      }
    ]
  })
  const failSub = await Teams.findAll({
    group: ["id"],
    attributes: ['id','name'],
    where:{
      id:userTeam.Teams[0].id
    },
    include:[
      {
        model:User,
        attributes:["id"],
        through:{
          attributes:[]
        },
        include:{
          model: Submission,
          attributes:[[sequelize.fn("COUNT", sequelize.col("challenge_id")), "teamFailSubmissions"]],
          where:{
            state:'fail'
          }
        }
      }
    ]
  })
  const pendingSub = await Teams.findAll({
    group: ["id"],
    attributes: ['id','name'],
    where:{
      id:userTeam.Teams[0].id
    },
    include:[
      {
        model:User,
        attributes:["id"],
        through:{
          attributes:[]
        },
        include:{
          model: Submission,
          attributes:[[sequelize.fn("COUNT", sequelize.col("challenge_id")), "teamPendingSubmissions"]],
          where:{
            state:'pending'
          }
        }
      }
    ]
  })

  const succes= successSub[0].Users[0].Submissions[0].dataValues.teamSuccessSubmissions
  const fail = failSub[0].Users[0].Submissions[0].dataValues.teamFailSubmissions;
  const pending = pendingSub[0].Users[0].Submissions[0].dataValues.teamPendingSubmissions;
  const allSub= succes+fail+pending

  const teamSubmissions={
    allTheTeamSubmissions:allSub,
    teamSuccesSubnissions:succes,
    teamFailSubnissions:fail,
    teamPendingSubnissions:pending
  }
  res.json(teamSubmissions);
}catch(err){
  res.json(err)
}
});

//team success challenges

router.get('/success-challenge', async (req, res) => {
  try{
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
    const successCallenges = await Teams.findAll({
      attributes: ['id','name'],
      where:{
        id:userTeam.Teams[0].id
      },
      include:[
        {
          model:User,
          attributes:["id"],
          through:{
            attributes:[]
          },
          include:{
            model: Submission,
            attributes:["id"],
            where:{
              state:'success'
            },
            include:[{
              model: Challenge,
              attributes:["name"]
            }]
          }
        }
      ]
    })

    res.send(successCallenges)
  }catch(err){
    res.status(400).send(err)
  }
  })

module.exports = router;


