const insightsTeamsRouter = require('express').Router();
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { checkTeamPermission, checkTeacherPermission } = require('../../../middleware/checkTeamPermission');
const {
  Submission, Team, User, Challenge,
} = require('../../../models');

// returns the 5 teams with the most successful submissions
insightsTeamsRouter.get('/top', async (req, res) => {
  try {
    const topTeams = await Team.findAll({
      group: ['id'],
      attributes: ['id', 'name'],
      include: [
        {
          model: User,
          attributes: ['userName'],
          through: {
            attributes: [],
          },
          include: {
            model: Submission,
            attributes: [
              [
                sequelize.fn('COUNT', sequelize.col('challenge_id')),
                'teamSuccessSubmissions',
              ],
            ],
            where: {
              state: 'success',
            },
          },
        },
      ],
      order: [[sequelize.fn('COUNT', sequelize.col('challenge_id')), 'DESC']],
    });

    const topFiveTeams = topTeams.slice(0, 5);

    res.json(topFiveTeams);
  } catch (err) {
    res.status(400).send(err);
  }
});

// for the team related to the logged in user

async function getTeamUsersIds(userId,teamId) {

  // get team users
  const currentTeamUsers = await Team.findOne({
    where: {
      id:teamId,
    },
    attributes: ['name'],
    include: [
      {
        model: User,
        attributes: ['id'],
        through: {
          attributes: [],
        },
      },
    ],
  });

  // returns array with users ids
  const usersId = currentTeamUsers.Users.map((value) => value.id);

  return [usersId];
}

// returns the  users with most successful submissions in the team
insightsTeamsRouter.get('/top-user/:teamId', checkTeamPermission, checkTeacherPermission, async (req, res) => {
  try {
    const loggedUser = req.user.userId;
    const {teamId} = req.params
    const teamUsersIds = await getTeamUsersIds(loggedUser,teamId);

    // returns top 5 users and their successful submissions
    const teamUsersTopSuccess = await User.findAll({
      where: {
        id: teamUsersIds[0],
      },
      attributes: ['id', 'userName'],
      include: [
        {
          model: Submission,
          where: {
            state:['SUCCESS','FAIL']
          }
        },
      ],
      order:[[Submission,'createdAt','DESC']]
    });
    res.json(teamUsersTopSuccess);
  } catch (err) {
    res.status(400).send(err);
  }
});

// returns last week submissions  for the logged in user team
insightsTeamsRouter.get('/last-week-submissions/:teamId',checkTeamPermission,checkTeacherPermission ,async (req, res) => {
  try {
    const loggedUser = req.user.userId
    const {teamId} = req.params
    const teamUsersIds = await getTeamUsersIds(loggedUser,teamId);

    // return the teams successful submissions from the last week by day

    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    const lastWeekTeamSubmissions = await Submission.findAll({
      raw: true,
      group: [sequelize.fn('DAY', sequelize.col('Submission.created_at'))],
      attributes: [
        [sequelize.fn('COUNT', 'id'), 'dateSubmissions'],
        'createdAt',
      ],
      where: {
        created_at: {
          [Op.gte]: new Date(Date.now() - sevenDays),
        },
        userId: teamUsersIds[0],
      },
      order: [
        [sequelize.fn('DAY', sequelize.col('Submission.created_at')), 'desc'],
      ],
    });
    res.json(lastWeekTeamSubmissions);
  } catch (err) {
    res.status(400).send(err);
  }
});

// returns the teams submissions status(total amount, pending, success, fail)
insightsTeamsRouter.get('/team-submissions', async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 1;

    const teamUsersId = await getTeamUsersIds(loggedUser);

    // returns submissions count for each state
    const submissionsStatus = await Submission.findAll({
      attributes: [
        'state',
        [sequelize.fn('COUNT', sequelize.col('id')), 'teamSubmissions'],
      ],
      where: {
        userId: teamUsersId[0],
      },
      group: ['state'],
    });

    const success = submissionsStatus.find((element) => element.state === 'SUCCESS');
    const fail = submissionsStatus.find((element) => element.state === 'FAIL');
    const pending = submissionsStatus.find((element) => element.state === 'PENDING');

    const teamSubmissionsStatus = {
      all: submissionsStatus.reduce((count, element) => count + element.dataValues.teamSubmissions, 0),
      fail: fail ? fail.dataValues.teamSubmissions : 0,
      success: success ? success.dataValues.teamSubmissions : 0,
      pending: pending ? pending.dataValues.teamSubmissions : 0,
    };
    res.json(teamSubmissionsStatus);
  } catch (err) {
    res.status(400).send(err);
  }
});

// returns the top  challenges, with the most successful submissions in the team
insightsTeamsRouter.get('/success-challenge/:teamId',checkTeamPermission,checkTeacherPermission, async (req, res) => {
  try {
    const loggedUser = req.user.userId
    const {teamId} = req.params
    const teamUsersIds = await getTeamUsersIds(loggedUser,teamId);

    // returns the count of all the successes per challenge for the team
    const successfulTeamChallenges = await Submission.findAll({
      group: ['challengeId'],
      attributes: [
        [sequelize.fn('COUNT', 'challengeId'), 'challengeSuccesses'],
        'challengeId',
      ],
      where: {
        state: 'SUCCESS',
        userId: teamUsersIds[0],
      },
      include: [
        {
          model: Challenge,
          attributes: ['name'],
        },
      ],
      order: [[sequelize.fn('COUNT', 'challengeId'), 'DESC']],
    });

    res.json(successfulTeamChallenges.slice(0,5));
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = insightsTeamsRouter;
