require('dotenv').config();
const submissionRouter = require('express').Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const checkAdmin = require('../../middleware/checkAdmin');
const { handleGithubTokens } = require('../../helpers');
const {
  Submission, User, Challenge, Review,
} = require('../../models');

// get challenge last submission by username
submissionRouter.get('/by-user/:challengeId', async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { userId } = req.user;

    const testSubmission = await Submission.findAll({
      where: {
        challengeId,
        userId,
      },
      include: [
        {
          model: User,
          attributes: ['userName'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });
    const timeNow = Date.now();
    if (testSubmission.length > 0) {
      const recentSubmission = testSubmission[testSubmission.length - 1].dataValues;
      if (recentSubmission.state === 'PENDING') {
        if (timeNow - recentSubmission.createdAt.getTime() > 265000) {
          const submissionThatIsStuck = await Submission.findByPk(
            recentSubmission.id,
          );
          await submissionThatIsStuck.update({ state: 'FAIL' });
        }
      }
    }

    return res.json(testSubmission[testSubmission.length - 1]);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "can't get the challenge submissions" });
  }
});

// apply solution challenge
submissionRouter.post('/apply/:challengeId', async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { commentContent, commentTitle, rating } = req.body;
    const solutionRepository = req.body.repository;
    // adding review
    await Review.create({
      userId: req.user.userId,
      challengeId,
      title: commentTitle,
      content: commentContent,
      rating,
    });
    const challenge = await Challenge.findByPk(challengeId);
    const pendingSubmission = await Submission.findOne({
      where: {
        solutionRepository,
        state: 'PENDING',
      },
    });
    if (pendingSubmission) {
      return res.status(400).json({ message: 'already submitting' });
    }
    const submission = await Submission.create({
      challengeId,
      userId: req.user.userId,
      state: 'PENDING',
      solutionRepository,
    });

    const urltoSet = process.env.MY_URL.concat(
      `/api/v1/webhooks/submissions/${submission.id}`,
    );
    const bearerToken = jwt.sign(
      { userId: req.user.userId, userName: req.user.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' },
    );
    const pureToken = bearerToken.indexOf(' ') !== -1 ? bearerToken.split(' ')[1] : bearerToken;
    const ref = process.env.MY_BRANCH || process.env.DEFAULT_BRANCH || 'master'; // In case somehow the process env branches are not set.
    // console.log(
    //   {
    //     ref, // the branch that the actions are run on
    //     inputs: {
    //       testRepo: challenge.repositoryName, // Repository to run the tests on
    //       solutionRepo: solutionRepository, // The repository that holds the submitted solution
    //       webhookUrl: urltoSet, // the url to come back to when the action is finished
    //       bearerToken: pureToken, // the access token to get back to our server ** currently not in use
    //     },
    //   },
    //   {
    //     "Content-Type": "application/json",
    //     Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    //   },
    //   challenge.type
    // );
    const response = await axios
      .post(
        `https://api.github.com/repos/${process.env.GITHUB_REPO}/actions/workflows/${challenge.type}.yml/dispatches`,
        {
          ref, // the branch that the actions are run on
          inputs: {
            testRepo: challenge.repositoryName, // Repository to run the tests on
            solutionRepo: solutionRepository, // The repository that holds the submitted solution
            webhookUrl: urltoSet, // the url to come back to when the action is finished
            bearerToken: pureToken, // the access token to get back to our server ** currently not in use
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
          },
        },
      )
      .catch((error) => {
        handleGithubTokens(error.response.headers);
        console.error(error.message);
      });
    handleGithubTokens(response.headers);
    return res.json(response.status);
  } catch (error) {
    console.error(error.message);
    handleGithubTokens(error.response.headers);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

//= ==================Not in use=========================================//

// get all challenge submissions
submissionRouter.get('/:challengeId', checkAdmin, async (req, res) => {
  try {
    const { challengeId } = req.params;
    const allSubmission = await Submission.findAll({
      where: {
        challengeId,
      },
      include: [
        {
          model: User,
          attributes: ['userName'],
        },
      ],
    });
    return res.json(allSubmission);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "can't get the challenge submissions" });
  }
});

module.exports = submissionRouter;
