const { Router } = require('express');
const axios = require('axios');
const filterResults = require('../../middleware/filterResults');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const { Submission, Challenge, Label, labels_to_challenge } = require('../../models');

const router = Router();

router.get('/',filterResults, async (req, res) => {
  const {condition,labels} = req
  try {
    const allChallenges = await Challenge.findAll({
      where: condition,
      include: [Label]
    });
    if(labels){
      const filterChallenges = allChallenges.filter((challenge)=>{
        // challenge.Labels[t].id === labels[j]  
        // return challenge ;
        return labels.some((label)=>{
          return challenge.Labels.some((x)=>{
            return x.id == label  ;
          })
        })
      });
      res.json(filterChallenges);
    } else {
      res.json(allChallenges)
    }
    
  } catch (error) {
    res.send('an error has happened')
  }
})

router.get('/labels', async (req, res) => {
  const allLabels = await Label.findAll();
  res.json(allLabels.map(({id,name})=>{return{label:name,value:id}}))
})

router.get('/:challengeId/submissions', async (req, res) => {
  const { challengeId } = req.params;
  const allSubmission = await Submission.findAll({ where: {
    challengeId
  } });
  res.json(allSubmission)
})

router.post('/:challengeId/apply', async (req, res) => {
  const { solutionRepository } = req.body;
  const challengeId = req.params.challengeId;
  const challenge = await Challenge.findByPk(challengeId);
  let submission = await Submission.findOne({
    where: {
      solutionRepository
    }
  });
  if (!submission) {
    submission = await Submission.create({
      challengeId,
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

module.exports = router;
