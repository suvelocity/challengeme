const insightAdminRouter = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const { Submission, Challenge, Review, User, Team } = require('../../../models');

//===================Not in use=========================================//

// returns the 5 challenges with most submissions
insightAdminRouter.get('/top-challenges', async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// returns the count of challenges from same type('type name' + 'count')
insightAdminRouter.get('/challenges-type', async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// returns top 5 challenges ordered by rating average (from reviews)
insightAdminRouter.get('/challenges-by-reviews', async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// returns the 5 teams with the most successful submissions
insightAdminRouter.get('/top', async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

//=======================================================================//



// returns the top challenges, with the most successful submissions
insightAdminRouter.get('/success-challenge', async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// returns last week submissions count
insightAdminRouter.get('/last-week-submissions', async (req, res) => {
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
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// returns all the submissions per challenge
insightAdminRouter.get('/challenges-submissions', async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// returns all the submissions per user
insightAdminRouter.get('/users-submissions', async (req, res) => {
  try {
    const topUsers = await User.findAll({
      attributes: ['userName', 'phoneNumber', 'firstName', 'lastName', 'email'],
      include: {
        model: Submission,
        include: { model: Challenge },
      },
    });
    res.json(topUsers);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

// returns all the users with ordered submissions by date
insightAdminRouter.get('/top-user', async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = insightAdminRouter;
