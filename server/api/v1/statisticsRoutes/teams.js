const { Router } = require('express');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const router = Router()
const { Submission, Challenge, Teams, User } = require('../../../models');


router.get('/top', async (req, res) => {
    const topTeam = await Teams.findAll({
      group: ["id"],
      attributes: ['id','name'],
      include:[
        {
          model:User,
          include:{
            model: Submission,
            attributes:[[sequelize.fn("COUNT", sequelize.col("id")), "teamSubmissions"]],
            where:{
              state:'success'
            }
          }
        }
      ]
    })
    if(err){
      res.send(err)
    }
    res.send(topTeam)
  })

module.exports = router;

// select teams.name, count(submissions.id) 
// from teams
// join users_teams
// on teams.id = users_teams.team_id
// join users
// on users_teams.user_id = users.id
// join submissions
// on users.id = submissions.user_id
// where submissions.state = 'SUCCESS'
// group by teams.id