const { Router } = require('express');
const axios = require('axios');
const filterResults = require('../../middleware/filterResults');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const fs = require("fs")

const { Submission, Challenge, Label } = require('../../models');

const router = Router();

router.get('/',filterResults, async (req, res) => {
  const {condition,labels} = req
    try {
      const allChallenges = await Challenge.findAll({
        where: condition,
        include: [Label]
      });
      if(labels){ // if filter for labels
        const filterChallenges = allChallenges.filter((challenge)=>{
          return labels.some((label)=>{ // if at least one of the existing labels
            return challenge.Labels.some((x)=>{ // matches at least one of the Challenge's labels 
            return x.id == label  ;
          })
        })
      });
      res.json(filterChallenges);
    } else { // else dont filter
      res.json(allChallenges)
    }
    } catch (error) {
      res.send('an error has happened')
    }
  })

router.get('/update_date', async (req, res) => {
  const { data: repo } = await axios.get(`https://api.github.com/repos/${req.query.repo_name}`,{headers: {
    Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
  }})
  res.json(repo)
})

router.get('/public_repo', async (req, res) => {
  const { data: repo } = await axios.get(`https://api.github.com/repos/${req.query.repo_name}`,{headers: {
    Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
  }})
  res.json(repo)
})

router.get('/:challengeId/submissions', async (req, res) => {
  const { challengeId } = req.params;
  const allSubmission = await Submission.findAll({ where: {
    challengeId
  } });
  res.json(allSubmission)
})

router.get('/public_repo', async (req, res) => {
  try {
    const { data: repo } = await axios.get(`https://api.github.com/repos/${req.query.repo_name}`, {
      headers: {Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`}
    });
    if(!repo.private) {
      res.json(repo);
    } else {
      res.status(401).send('Repo is private');
    }
  } catch(error) {
    res.status(400).send('Repo does not exist');
  }
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
    res.json({ status: 500, error: e })
  }

})



// router Post - new challenge
router.post(`/`,async(req,res) => {
  try {
    const newRepo = req.body.repositoryName;
    const check = await Challenge.findOne({
      where:{
        repositoryName: newRepo
      }
    })
    if(check) {
      return res.status(500).send('Repo is already in the system');
    }
    const newChallenge = await Challenge.create(req.body);
    res.status(200).send(newChallenge);
  } catch(err) {
    res.status(400).send('Bad request');
  }
})

// router Get - github/workflows
router.get('/type', async (req,res) => {
  try{
    const files = fs.readdirSync('../.github/workflows');
    let types = files.map(file =>
      !file.includes("deploy")?
      file.slice(0,-4)
      :
      null
    )
    types = types.filter(type => type!==null)
    res.send(types)
  }catch(e){res.send(e.message)}
})

module.exports = router;
