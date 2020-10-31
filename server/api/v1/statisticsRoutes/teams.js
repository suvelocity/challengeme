const { Router } = require('express');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

const router = Router();

const {
  Submission, Team, User, Challenge,
} = require('../../../models');

// returns the 5 teams with the most successfull submissions
router.get('/top', async (req, res) => {
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

    res.send(topFiveTeams);
  } catch (err) {
    res.status(400).send(err);
  }
});

// for the team related to the logged in user

async function getTeamUsersIds(userId) {
  // returns the logged user team
  const userTeam = await Team.findOne({
    attributes: [
      'id', 'name',
    ],
    include: [
      {
        model: User,
        attributes: [],
        through: {
          attributes: [],
        },
        where: {
          id: userId,
        },
      },
    ],
  });

  // get team users
  const currentTeamUsers = await Team.findOne({
    where: {
      id: userTeam.id,
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

  return [usersId, userTeam.name];
}

// returns the 5 users with most successfull submissions in the team
router.get('/top-user', async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 1;

    const teamUsersIds = await getTeamUsersIds(loggedUser);

    // returns top 5 users and thier successfull submissions
    const teamUsersTopSuccess = await User.findAll({

      group: ['id'],
      include: [
        {
          model: Submission,
          attributes: [
            [
              sequelize.fn('COUNT', sequelize.col('user_id')),
              'userSuccessSubmission',
            ],
          ],
          where: {
            state: 'success',
          },
        },
      ],
      where: {
        id: teamUsersIds[0],
      },
      attributes: ['id', 'userName'],
      order: [[sequelize.fn('COUNT', sequelize.col('user_id')), 'DESC']],
    });

    res.send([teamUsersTopSuccess.slice(0, 5), teamUsersIds[1]]);
  } catch (err) {
    res.status(400).send(err);
  }
});

// returns last week submissions  for the logged in user team
router.get('/last-week-submissions', async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 1;

    const teamUsersIds = await getTeamUsersIds(loggedUser);

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
        state: 'SUCCESS',
        created_at: {
          [Op.gte]: new Date(Date.now() - sevenDays),
        },
        userId: teamUsersIds[0],
      },
      order: [
        [sequelize.fn('DAY', sequelize.col('Submission.created_at')), 'desc'],
      ],
    });
    res.send(lastWeekTeamSubmissions);
  } catch (err) {
    res.status(400).send(err);
  }
});

// returns the teams submissions status(total amount, pending, success, fail)
router.get('/team-submissions', async (req, res) => {
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

    success = submissionsStatus.find((element) => element.state === 'SUCCESS');
    fail = submissionsStatus.find((element) => element.state === 'FAIL');
    pending = submissionsStatus.find((element) => element.state === 'PENDING');

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

// returns the top 5 challenges, with the most successful submissions in the team
router.get('/success-challenge', async (req, res) => {
  try {
    const loggedUser = req.user ? req.user.id : 1;

    const teamUsersIds = await getTeamUsersIds(loggedUser);

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
      limit: 5,
    });

    res.send(successfulTeamChallenges);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
