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

router.get("/:challengeId", async (req, res) => {
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

router.get("/labels", async (req, res) => {
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

router.get("/:challengeId/submissions", async (req, res) => {
	try {
		const { challengeId } = req.params;
		const allSubmission = await Submission.findAll({ where: { challengeId } });
		res.json(allSubmission);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.post("/:challengeId/apply", async (req, res) => {
	const challengeId = req.params.challengeId;
	const { commentContent, commentTitle, rating, userId } = req.body;
	const solutionRepository = req.body.repository;
	// adding review
	await Review.create({
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
			state: "PENDING",
			solutionRepository
		});
	} else if (submission.state === "PENDING") {
		return res.json({ error: "already exist" });
	}

	if (submission.state === "SUCCESS") {
		return res.json({ error: "already success" });
	}

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

module.exports = router;
