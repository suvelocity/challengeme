const { Router } = require('express');
const axios = require('axios');
const filterResults = require('../../middleware/filterResults');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const { Submission, Challenge, Label, labels_to_challenge } = require('../../models');

const challengeRouter = Router();

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

challengeRouter.get("/:challengeId", async (req, res) => {
	try {
		let challenge = await Challenge.findOne({
			where: { id: req.params.challengeId },
			include: [
				// TODO: add a ORM query to add prop to the challenge with 'rating':3 .... pay attention to round the result to integer
				{
					model: Label,
					attributes: ["name"]
				}
			]
		});
		const author = await challenge.getUser();
		challenge.author = "qwqwe";
		res.json({ challenge, author });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

challengeRouter.get("/labels", async (req, res) => {
	try {
		const allLabels = await Label.findAll();
		res.json(
			allLabels.map(({ id, name }) => {
				return { label: name, value: id };
			})
		);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

challengeRouter.get("/:challengeId/submissions", async (req, res) => {
	try {
		const { challengeId } = req.params;
		const allSubmission = await Submission.findAll({ where: { challengeId } });
		res.json(allSubmission);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

  if(submission.state === 'FAIL') {
    await submission.update({ state: 'PENDING' })
  }
/* ,
        webhook:'https://api.ngrok.com' */
  try {
    const urltoSet = process.env.MY_URL.concat(`/api/v1/webhook/submission/${submission.id}`);
    //console.log(urltoSet);
    const { status } = await axios.post(`https://api.github.com/repos/${process.env.GITHUB_REPO}/actions/workflows/${challenge.type}.yml/dispatches`, {
      ref: 'master',
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

	if (submission.state !== "FAIL") {
		await submission.update({ state: "PENDING" });
	}

	try {
		const { status } = await axios.post(
			`https://api.github.com/repos/${process.env.GITHUB_REPO}/actions/workflows/${challenge.type}.yml/dispatches`,
			{
				ref: "master",
				inputs: {
					name: `aa${process.env.ENV_NAME}${submission.id}`,
					testRepo: challenge.repositoryName,
					solutionRepo: solutionRepository
				}
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
				}
			}
		);

		res.json({ status });
	} catch (e) {
		console.log("aaaa", e.message);
		res.json({ status: 500, error: e });
	}
});

module.exports = challengeRouter;
