const { Router } = require('express');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const router = Router()
const { Submission, Teams, User, UsersTeams } = require('../../../models');


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
    topTeam.forEach(element => {
      delete element["Users.UsersTeams.teamId"]
      delete element["Users.UsersTeams.userId"]
      delete element["Users.UsersTeams.createdAt"]
      delete element["Users.UsersTeams.updatedAt"]
      delete element["Users.UsersTeams.createdAt"]
      delete element["Users.UsersTeams.TeamId"]
      delete element["Users.Submissions.id"]
      delete element["Users.UsersTeams.UserId"]
      delete element["Users.UsersTeams.createdAt"]
    })
    res.send(topTeam)
  }catch(err){
    res.status(400).send(err)
  }
  })

  router.get('/top-user', async (req, res) => {
    try{
      const teams = await Teams.findByPk(1)
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
        const team = await Teams.findAll({
          raw:true,
          group:[sequelize.fn("DAY", "submissions.createdAt")],
          attributes: ['id','name',[sequelize.fn("COUNT", "submissions.id"), "teamSubmissions"]],
          where:{
            id: 1
          },
          include:[
            {
              model:User,
              attributes:[],
              include:{
                model: Submission,
                attributes:["createdAt"],
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

        const taem = await Submission.findAll({
          group:[sequelize.fn("DAY", sequelize.col("created_at"))],
          attributes: ['id',[sequelize.fn("COUNT", "id"), "teamSubmissions"]],
        })
        team.forEach(element => {
          delete element["Users.UsersTeams.teamId"]
          delete element["Users.UsersTeams.userId"]
          delete element["Users.UsersTeams.createdAt"]
          delete element["Users.UsersTeams.updatedAt"]
          delete element["Users.UsersTeams.TeamId"]
          delete element["Users.Submissions.id"]
          delete element["Users.UsersTeams.UserId"]
        })
        res.send(taem)
      }catch(err){
        res.status(400).send(err)
      }
      })

module.exports = router;
