const { Router } = require("express");
const axios = require("axios");
const searchFilters = require("../../middleware/searchFilters");
const { Sequelize } = require("sequelize");

const router = Router();

const { Submission, User, Challenge, Label, Review } = require("../../models");

//get all challenges
router.get("/", searchFilters, async (req, res) => {
  const { condition, labels } = req;
  try {
    const allChallenges = await Challenge.findAll({
      where: condition,
      include: [
        {
          model:Label,
          attributes:["id","name"]
        },
        {
          model: Review,
          attributes: ["rating"], // TODO: add here sequelize function to agreagate and savarage the rating and tound to mispar shalem
        },
        {
          model: User,
          attributes: ["userName"],
        },
      ],
    });
    if (labels) {
      // if filter for labels
      const filterChallenges = allChallenges.filter((challenge) => {
        return labels.some((label) => {
          // if at least one of the existing labels
          return challenge.Labels.some((x) => {
            // matches at least one of the Challenge's labels
            return x.id == label;
          });
        });
      });
      res.json(filterChallenges);
    } else {
      // else dont filter
      res.json(allChallenges);
    }
  } catch (error) {
    res.status(400).json({ message: "can't get all challenges" }); //
  }
});

router.get("/:challengeId/submissions", async (req, res) => {
  try {
    const { challengeId } = req.params;
    const allSubmission = await Submission.findAll(
      {
        include:[{
          model:User,
          attributes:["userName"]
        }],
        where: {
          challengeId
        }
      });
    res.json(allSubmission);
  } catch (error) {
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
    res.status(400).json({ message: "Cannot process request" });
  }
});

router.post('/:challengeId/apply', async (req, res) => {
  const challengeId = req.params.challengeId;
  const { commentContent, commentTitle, rating, } = req.body;
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
  let submission = await Submission.findOne({
    where: {
      solutionRepository,
    },
  });
  if (!submission) {
    submission = await Submission.create({
      challengeId,
      userId: req.body.userId,
      state: "PENDING",
      solutionRepository,
    });
  } else if (submission.state === "PENDING") {
    return res.json({ error: "already exist" });
  }

  if (submission.state === "SUCCESS") {
    return res.json({ error: "already success" });
  }

  if (submission.state === "FAIL") {
    await submission.update({ state: "PENDING" });
  }
  try {
    const urltoSet = process.env.MY_URL.concat(
      `/api/v1/webhook/submission/${submission.id}`
    );
    const bearerToken = req.headers.authorization || 'bearer myToken';
    const pureToken =
      bearerToken.indexOf(' ') !== -1 ? bearerToken.split(' ')[1] : bearerToken;
    const ref = process.env.MY_BRANCH || process.env.DEFAULT_BRANCH || 'master'; // In case somehow the process env branches are not set.
    console.log('CHALLENGE TYPE !!!!!', challenge.repositoryName, challenge.type)
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
    );

    res.json({ status });
  } catch {
    res.status(400).json({ message: "Cannot process request" });
  }
});

router.get("/:challengeId", async (req, res) => {
  try {
    let challenge = await Challenge.findOne({
      where: { id: req.params.challengeId },
      include: [
        // TODO: add a ORM query to add prop to the challenge with 'rating':3 .... pay attention to round the result to integer
        {
          model: Label,
          attributes: ["name"],
        },
        {
          model: Review,
          attributes: [
            [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"],
          ],
        },
      ],
    });
    const author = await challenge.getUser();
    res.json({ challenge, author });
  } catch (error) {
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
