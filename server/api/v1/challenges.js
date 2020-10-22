require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { Sequelize, Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const router = Router();

const { Submission, User, Challenge, Label, Review } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const name = req.query.name || "";
    let labels = req.query.labels || [];

    const allChallenges = await Challenge.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: [
        {
          model: User,
          as: "Author",
          attributes: ["userName"],
        },
        {
          model: Label,
          attributes: ["name", "id"],
          through: {
            attributes: []
          }
        },
      ],
    });

    const allChallengesId = allChallenges.map((challenge) => challenge.id)

    const challengeSubmittions = await Submission.findAll({
      where: {
        challengeId: allChallengesId
      },
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("id")), "submissionsCount"], 'challengeId'
      ],
      group: ['challengeId']
    })

    const reviewsAvg = await Review.findAll({
      where: {
        challengeId: allChallengesId
      },
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRaiting"], 'challengeId'
      ],
      group: ['challengeId']
    })

    const allChallengesWithReviews = allChallenges.map((challenge, index) => {
      reviewsAvg.forEach(review => {
        if (review.dataValues.challengeId === challenge.dataValues.id) {
          challenge.dataValues.averageRaiting = review.dataValues.averageRaiting
        }
      });

      if (!challenge.dataValues.averageRaiting) {
        challenge.dataValues.averageRaiting = null
      }

      challengeSubmittions.forEach(countSubmissions => {
        if (countSubmissions.dataValues.challengeId === challenge.dataValues.id) {
          challenge.dataValues.submissionsCount = countSubmissions.dataValues.submissionsCount
        }
      })

      if (!challenge.dataValues.submissionsCount) {
        challenge.dataValues.submissionsCount = 0
      }
      return challenge
    })

    res.json(allChallengesWithReviews)
  } catch (error) {
    console.error(error.message)
    res.status(400).json({ message: "can't get the challenges" });
  }
});

router.get("/:challengeId/:userName/submission", async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { userName } = req.params;

    const { id } = await User.findOne({
      where: { userName },
      attributes: ["id"],
    });
    const testSubmission = await Submission.findAll({
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
      where: {
        challengeId,
        userId: id,
      },
    });
    const timeNow = Date.now();
    if (testSubmission.length > 0) {
      const recentSubmission = testSubmission[testSubmission.length - 1].dataValues;
      if (recentSubmission.state === 'PENDING') {
        if ((timeNow - recentSubmission.createdAt.getTime()) > 150000) {
          let submissionThatIsStuck = await Submission.findByPk(recentSubmission.id);
          await submissionThatIsStuck.update({ state: "FAIL" });
          console.log('its because zach is crazy');
        }
      }
    }
    res.json(testSubmission[testSubmission.length - 1]);
  } catch (error) {
    console.error(error.message)
    res.status(400).json({ message: "can't get the challenge submissions" });
  }
});

router.get("/:challengeId/submissions", async (req, res) => {
  try {
    const { challengeId } = req.params;
    const allSubmission = await Submission.findAll({
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
      where: {
        challengeId,
      },
    });
    res.json(allSubmission);
  } catch (error) {
    console.error(error.message)
    res.status(400).json({ message: "can't get the challenge submissions" });
  }
});
// router Post - new challenge
router.post(`/`, async (req, res) => {
  try {
    const { repositoryName: newRepo } = req.body;
    const repoExists = await Challenge.findOne({
      where: {
        repositoryName: newRepo,
      },
    });
    if (repoExists) {
      return res.status(409).json({ message: "Repo is already in the system" });
    }
    const newChallenge = await Challenge.create(req.body);
    res.json(newChallenge);
  } catch (err) {
    console.error(error.message)
    res.status(400).json({ message: "Cannot process request" });
  }
});

router.post("/:challengeId/apply", async (req, res) => {
  try {
    const challengeId = req.params.challengeId;
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
        state: "PENDING"
      },
    });
    if (pendingSubmission) {
      return res.status(400).json({ message: "already submitting" });
    }
    submission = await Submission.create({
      challengeId,
      userId: req.user.userId,
      state: "PENDING",
      solutionRepository,
    });

    const urltoSet = process.env.MY_URL.concat(
      `/api/v1/webhook/submission/${submission.id}`
    );
    const bearerToken = jwt.sign({ userId: req.user.userId, userName: req.user.userName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    const pureToken =
      bearerToken.indexOf(" ") !== -1 ? bearerToken.split(" ")[1] : bearerToken;
    const ref = process.env.MY_BRANCH || process.env.DEFAULT_BRANCH || "master"; // In case somehow the process env branches are not set.
    console.log({
      ref: ref, // the branch that the actions are run on
      inputs: {
        testRepo: challenge.repositoryName, // Repository to run the tests on
        solutionRepo: solutionRepository, // The repository that holds the submitted solution
        webhookUrl: urltoSet, // the url to come back to when the action is finished
        bearerToken: pureToken, // the access token to get back to our server ** currently not in use
      },
    },
      {
        "Content-Type": "application/json",
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },challenge.type)
    const { status } = await axios.post(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/actions/workflows/${challenge.type}.yml/dispatches`,
      {
        ref: ref, // the branch that the actions are run on
        inputs: {
          testRepo: challenge.repositoryName, // Repository to run the tests on
          solutionRepo: solutionRepository, // The repository that holds the submitted solution
          webhookUrl: urltoSet, // the url to come back to when the action is finished
          bearerToken: pureToken, // the access token to get back to our server ** currently not in use
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      }
    ).catch(error => {
      console.error(error.message);
    });

    res.json({ status });
  } catch (error) {
    console.error(error.message)
    res.status(400).json({ message: "Cannot process request" });
  }
});

router.get("/:challengeId", async (req, res) => {
  try {
    const challenge = await Challenge.findOne({
      where: { id: req.params.challengeId },
      include: [
        {
          model: Label,
          attributes: ["name", "id"],
          through: {
            attributes: []
          }
        },
        {
          model: User,
          as: "Author",
          attributes: ["email", "userName"],
        },
      ],
    });

    const challengeSubmittions = await Submission.findAll({
      where: { challengeId: req.params.challengeId },
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("id")), "submissionsCount"], 'challengeId'
      ],
      group: ['challengeId']
    })

    const averageRaiting = await Review.findAll({
      where: { challengeId: req.params.challengeId },
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"],
        'challengeId'
      ],
      group: ['challengeId']
    })

    challenge.dataValues.averageRaiting = averageRaiting[0] ? averageRaiting[0].dataValues.averageRating : null;
    challenge.dataValues.submissionsCount = challengeSubmittions[0] ? challengeSubmittions[0].dataValues.submissionsCount : 0;

    res.json(challenge);
  } catch (error) {
    console.error(error.message)
    res.status(400).json({ message: "Cannot process request" });
  }
});
module.exports = router;
