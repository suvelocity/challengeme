const { Router } = require('express');
const axios = require('axios');
const searchFilters = require('../../middleware/searchFilters');
const { Sequelize } = require('sequelize');

// const { Submission, Challenge, Label } = require('../../models');
const {  Submission,  User,Challenge,Label,labels_to_challenge,Review,} = require('../../models');

const router = Router();

//get all challenges
router.get('/',searchFilters, async (req, res) => {
  const {condition,labels} = req
    try {
      const allChallenges = await Challenge.findAll({
        where: condition,
        include: [
          Label,
          {
            model: Review,
            attributes: ['rating'],
          },]
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


  
router.get('/:challengeId/submissions', async (req, res) => {
  try {
    const { challengeId } = req.params;
    const allSubmission = await Submission.findAll({ where: { challengeId } });
    res.json(allSubmission);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})

//get repo details if its public

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
  const challengeId = req.params.challengeId;
  const { commentContent, commentTitle, rating, userId } = req.body;
  const solutionRepository = req.body.repository;
  // adding review
  await Review.create({
    userId,
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
state: 'PENDING',
solutionRepository,
});
} else if (submission.state === 'PENDING') {
return res.json({ error: 'already exist' });
}

if (submission.state === 'SUCCESS') {
return res.json({ error: 'already success' });
}

  if(submission.state === 'FAIL') {
    await submission.update({ state: 'PENDING' })
  }
  try {
    const urltoSet = process.env.MY_URL.concat(`/api/v1/webhook/submission/${submission.id}`);
    const bearerToken = req.headers.authorization || 'bearer bananaSplit';
    const pureToken = bearerToken.indexOf(' ')!== -1 ? bearerToken.split(' ')[1]: bearerToken;
    const { status } = await axios.post(`https://api.github.com/repos/${process.env.GITHUB_REPO}/actions/workflows/${challenge.type}.yml/dispatches`, {
      ref: 'master',
      inputs: {
        testRepo: challenge.repositoryName,
        solutionRepo: solutionRepository,
        webhookUrl: urltoSet,
        bearerToken: pureToken
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
      }
    }) 

res.json({ status });
} catch (e) {
console.log('aaaa', e.message);
res.json({ status: 500, error: e });
}
});



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

//get all labels
router.get('/labels', async (req, res) => {
  const allLabels = await Label.findAll();
  res.json(allLabels.map(({id,name})=>{return{label:name,value:id}}))
})

router.get('/:challengeId', async (req, res) => {
  try {
    console.log("got to the right endpoint $$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    let challenge = await Challenge.findOne({
      where: { id: req.params.challengeId },
      include: [
        // TODO: add a ORM query to add prop to the challenge with 'rating':3 .... pay attention to round the result to integer
        // [User],
        {
          model: Label,
          attributes: ['name'],
        },
        {
          model: Review,
          attributes: [
            [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
          ],
        },
      ],
    });

    const author = await challenge.getUser();
    challenge.author = 'qwqwe';
    res.json({ challenge, author });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
