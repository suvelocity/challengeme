const insightSubmissionRouter = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const checkAdmin = require('../../../middleware/checkAdmin');
const { checkTeacherPermission } = require('../../../middleware/checkTeamPermission');
const {
  Submission, Challenge, Review, User, Team
} = require('../../../models');

// returns the 5 challenges with most submissions
insightSubmissionRouter.get('/top-challenges', async (req, res) => {
  try {
    const topChallenges = await Submission.findAll({
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('challenge_id')), 'countSub'],
        ],
      },
      include: {
        model: Challenge,
        attributes: ['name'],
      },
      group: ['challenge_id'],
      order: [[sequelize.fn('COUNT', sequelize.col('challenge_id')), 'DESC']],
      limit: 5,
    });

    res.json(topChallenges);
  } catch (err) {
    res.status(400).send(err);
  }
});

// returns the 5 challenges with most successful submissions
insightSubmissionRouter.get('/success-challenge', async (req, res) => {
  try {
    const successfulTeamChallenges = await Submission.findAll({
      group: ['challengeId'],
      attributes: [
        [sequelize.fn('COUNT', 'challengeId'), 'challengeSuccesses'],
        'challengeId',
      ],
      where: {
        state: 'SUCCESS',
      },
      include: [
        {
          model: Challenge,
          attributes: ['name'],
        },
      ],
      order: [[sequelize.fn('COUNT', 'challengeId'), 'DESC']],
    });

    res.json(successfulTeamChallenges.slice(0, 5));
  } catch (err) {
    res.status(400).send(err);
  }
});

// returns the count of challenges from same type('type name' + 'count')
insightSubmissionRouter.get('/challenges-type', async (req, res) => {
  try {
    const challengesByType = await Challenge.findAll({
      attributes: [
        'type',
        [sequelize.fn('COUNT', sequelize.col('type')), 'countType'],
      ],
      group: ['type'],
      order: [[sequelize.fn('COUNT', sequelize.col('type')), 'DESC']],
      limit: 5,
    });
    res.json(challengesByType);
  } catch (err) {
    res.status(400).send(err);
  }
});

// returns the count of submissions submitted per day from the last 5 days
insightSubmissionRouter.get('/sub-by-date', async (req, res) => {
  try {
    const week = 7 * 24 * 60 * 60 * 1000;
    const subByDate = await Submission.findAll({
      raw: true,
      group: [sequelize.fn('DAY', sequelize.col('Submission.created_at'))],
      attributes: [
        [sequelize.fn('COUNT', 'id'), 'dateSubmissions'],
        'createdAt',
      ],
      where: {
        created_at: {
          [Op.gte]: new Date(Date.now() - week),
        },
      },
    });

    res.json(subByDate);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// returns top 5 challenges ordered by rating average (from reviews)
insightSubmissionRouter.get('/challenges-by-reviews', async (req, res) => {
  try {
    const challengesByRating = await Review.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'ratingAVG']],
      include: {
        model: Challenge,
      },
      group: ['challenge_id'],
      order: [[sequelize.fn('AVG', sequelize.col('rating')), 'DESC']],
      limit: 5,
    });

    // returns the average rating as number
    const challengesTopRating = challengesByRating.map((element) => {
      element.dataValues.ratingAVG = Number(element.dataValues.ratingAVG);
      return element;
    });

    res.json(challengesTopRating);
  } catch (err) {
    res.status(400).send(err);
  }
});
//= ======================================Teacher Routes===============================

const getUsersId = async (teamId) => {
  const currentTeamUsers = await Team.findOne({
    where: {
      id: teamId,
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
  return usersId
}


insightSubmissionRouter.get('/challenges-submissions/teacher/:teamId', checkTeacherPermission, checkAdmin, async (req, res) => {
  try {
    const { teamId } = req.params
    const usersId = await getUsersId(teamId)
    const topChallenges = await Submission.findAll({
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('challenge_id')), 'countSub'],
        ],
      },
      include: {
        model: Challenge,
        attributes: ['id', 'name'],
      },
      group: ['challenge_id'],
      order: [[sequelize.fn('COUNT', sequelize.col('challenge_id')), 'DESC']],
    });

    const users = await Challenge.findAll({
      include: {
        model: Submission,
        attributes: ['id', 'userId', 'createdAt', 'state', 'solutionRepository'],
        include: {
          model: User,
          where: {
            id: usersId
          },
          attributes: ['userName'],
        },
      },
    });

    res.json([topChallenges, users]);
  } catch (err) {
    res.status(400).send(err);
  }
});

insightSubmissionRouter.get('/users-submissions/teacher/:teamId', checkTeacherPermission, checkAdmin, async (req, res) => {
  try {
    const { teamId } = req.params
    const usersId = await getUsersId(teamId)
    console.log(usersId)
    const topUsers = await User.findAll({
      attributes: ['userName', 'phoneNumber', 'firstName', 'lastName', 'email'],
      where: {
        id: usersId
      },
      include: {
        model: Submission,
        include: { model: Challenge },
      },
    });
    res.json(topUsers);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});
//= ======================================Admin Routes===============================
insightSubmissionRouter.get('/challenges-submissions', checkAdmin, async (req, res) => {
  try {
    const topChallenges = await Submission.findAll({
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('challenge_id')), 'countSub'],
        ],
      },
      include: {
        model: Challenge,
        attributes: ['id', 'name'],
      },
      group: ['challenge_id'],
      order: [[sequelize.fn('COUNT', sequelize.col('challenge_id')), 'DESC']],
    });

    const users = await Challenge.findAll({
      include: {
        model: Submission,
        attributes: ['id', 'userId', 'createdAt', 'state', 'solutionRepository'],
        include: {
          model: User,
          attributes: ['userName'],
        },
      },
    });

    res.json([topChallenges, users]);
  } catch (err) {
    res.status(400).send(err);
  }
});

insightSubmissionRouter.get('/users-submissions', checkAdmin, async (req, res) => {
  try {
    const topUsers = await User.findAll({
      attributes: ['userName', 'phoneNumber', 'firstName', 'lastName', 'email'],
      include: {
        model: Submission,
        include: { model: Challenge },
      },
    });
    res.json(topUsers);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

insightSubmissionRouter.get('/top-user', checkAdmin, async (req, res) => {
  try {
    const topUsers = await User.findAll({
      attributes: ['id', 'userName'],
      include: {
        model: Submission,
        where: {
          state: ['SUCCESS', 'FAIL']
        }
      },
      order: [[Submission, 'createdAt', 'DESC']]
    });
    res.json(topUsers);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

module.exports = insightSubmissionRouter;
