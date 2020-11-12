const insightSubmissionRouter = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const checkAdmin = require('../../../middleware/checkAdmin');
const {
  Submission, Challenge, Review, User,
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
insightSubmissionRouter.get('/top-success', async (req, res) => {
  try {
    const mostSuccessful = await Submission.findAll({
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('challenge_id')), 'countSub'],
        ],
      },
      include: {
        model: Challenge,
        attributes: ['name'],
      },
      where: { state: 'SUCCESS' },
      group: ['challenge_id'],
      order: [[sequelize.fn('COUNT', sequelize.col('challenge_id')), 'DESC']],
      limit: 5,
    });
    res.json(mostSuccessful);
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
    const fiveDays = 5 * 24 * 60 * 60 * 1000;
    const submissionsByDate = await Submission.findAll({
      group: [sequelize.fn('DAY', sequelize.col('createdAt'))],
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'countByDay'],
        'createdAt',
      ],
      where: {
        created_at: {
          [Op.gte]: new Date(Date.now() - fiveDays),
        },
      },
    });
    res.json(submissionsByDate);
  } catch (err) {
    res.status(400).send(err);
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

module.exports = insightSubmissionRouter;
