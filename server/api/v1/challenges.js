const { Router } = require('express');
const axios = require('axios');
const filterResults = require('./middleware/filterResults');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const { Submission,User, Challenge, Label, labels_to_challenge, Reviews } = require('../../models');
// const { default: Review } = require('../../../client/src/components/ChallengePage/InfoTable/Tabs/ReviewsTab/Review');

const challengeRouter = Router();

challengeRouter.get('/',filterResults, async (req, res) => {
  try {
      const {condition,labels} = req;
      console.log(labels);
      const allChallenges = await Challenge.findAll({
        where: condition,
        include: {
          model: Label,
          attributes: ["name"]
        }
      });
      if(labels){
        const filterChallenges = allChallenges.filter((challenge)=>{
          return labels.some((label)=>{
            return challenge.Labels.some((x)=>{
              return x.id == label;
            })
          })
        });
        res.json(filterChallenges);
      } else {
        res.json(allChallenges)
      }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  
})



challengeRouter.get("/:challengeId", async (req, res) => {
  try {
    const challenge = await Challenge.findOne({
      where: { id: req.params.challengeId },
      include: [
        {
        model: Label,
        attributes: ["name"]
        }
    ]
    });
    const author = await challenge.getUser();
    res.json({challenge, author})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});













challengeRouter.get('/labels', async (req, res) => {
  try {
    const allLabels = await Label.findAll();
    res.json(allLabels.map(({id,name})=>{return{label:name,value:id}}))    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})











challengeRouter.get('/:challengeId/submissions', async (req, res) => {
  try {
    const { challengeId } = req.params;
    const allSubmission = await Submission.findAll({ where: { challengeId } });
    res.json(allSubmission);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})

challengeRouter.post('/:challengeId/apply', async (req, res) => {
  const challengeId = req.params.challengeId;
  const { commentContent, commentTitle, rating, userId } = req.body;
  const solutionRepository = req.body.repository;
  // adding review
  await Reviews.create({
    userId,
    challengeId,
    title: commentTitle, 
    content: commentContent,
    rating 
  });
  const challenge = await Challenge.findByPk(challengeId);
  let submission = await Submission.findOne({
    where: {
      solutionRepository
    }
  });
  if (!submission) {
      submission = await Submission.create({
      challengeId,
      userId: req.body.userId,
      state: 'PENDING',
      solutionRepository
    });
  } else if (submission.state === 'PENDING') {
    return res.json({ error: 'already exist' })
  }

  if (submission.state === 'SUCCESS') {
    return res.json({ error: 'already success' })
  }

  if(submission.state !== 'FAIL') {
    await submission.update({ state: 'PENDING' })
  }

  try {
    const { status } = await axios.post(`https://api.github.com/repos/${process.env.GITHUB_REPO}/actions/workflows/${challenge.type}.yml/dispatches`, {
      ref: 'master',
      inputs: {
        name: `aa${process.env.ENV_NAME}${submission.id}`,
        testRepo: challenge.repositoryName,
        solutionRepo: solutionRepository
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
      }
    })

    res.json({ status })
  } catch (e) {
    console.log('aaaa', e.message)
    res.json({ status: 500, error: e })
  }
})

module.exports = challengeRouter;
