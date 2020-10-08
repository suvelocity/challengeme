const { Router } = require('express');
const axios = require('axios');

const { Submission, Challenge } = require('../../models');

const router = Router();

router.get('/', async (req, res) => {
  const allChallenges = await Challenge.findAll();
  res.json(allChallenges)
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

  if(submission.state === 'FAIL') {
    await submission.update({ state: 'PENDING' })
  }
/* ,
        webhook:'https://api.ngrok.com' */
  try {
    const urltoSet = process.env.MY_URL.concat(`/api/v1/webhook/submission/${submission.id}`);
    //console.log(urltoSet);
    const { status } = await axios.post(`https://api.github.com/repos/${process.env.GITHUB_REPO}/actions/workflows/${challenge.type}.yml/dispatches`, {
      ref: 'meiron-try',
      inputs: {
        //name: `${solutionRepository}-Submission${submission.id}`,
        testRepo: challenge.repositoryName,
        solutionRepo: solutionRepository,
        webhookUrl: urltoSet
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
