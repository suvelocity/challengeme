
const request = require('supertest');
const app = require('../app');
const {Submission, Challenge} = require('../models');
const {challengeArr, solutionRepos, failRepos} = require('./mockData');
const nock = require('nock');

describe('Submission process', () => {
    beforeAll(async (done) => {
        await Challenge.destroy({ truncate: true, force: true });
        await Submission.destroy({ truncate: true, force: true });
        await Challenge.bulkCreate(challengeArr);
        console.log(solutionRepos)
        process.env.MY_URL = 'TheWebHookUrl';
        console.log(process.env.MY_URL)
        done();
      });
    test('Posting submisson and status change to PENDING', async (done) => {
        const challenges = await Challenge.findAll();
        const challengeType = challenges.find(challenge => challenge.id === solutionRepos[0].challengeId).type;
        console.log(challengeType)
        const githubmock = nock(`https://api.github.com`)
        .post(`/repos/${process.env.GITHUB_REPO}/actions/workflows/${challengeType}.yml/dispatches`,
        {
            testRepo: challengeArr.find(challenge=> challenge.id === solutionRepos[0].challengeId).repositoryName,
            solutionRepo: solutionRepos[0].repo,
            webhookUrl: process.env.MY_URL.concat(`/api/v1/webhook/submission/${1}`)
        })
        .matchHeader({
                'Content-Type': 'application/json',
                Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
            }
        )
        .reply(200)
        
        await request(app).post(`/api/v1/challenges/${solutionRepos[0].challengeId}/apply`).send({solutionRepository:solutionRepos[0].repo});
        expect(githubmock.isDone()).toEqual(true);
        // await request(app).post(`/api/v1/challenges/${solutionRepos[1].challengeId}/apply`).send({solutionRepository:solutionRepos[1].repo});
        // await request(app).post(`/api/v1/challenges/${solutionRepos[2].challengeId}/apply`).send({solutionRepository:solutionRepos[2].repo});
        // await request(app).post(`/api/v1/challenges/${failRepos[0].challengeId}/apply`).send({solutionRepository:failRepos[0].repo});
        let submissions = await Submission.findAll();
        expect(submissions.length).toBe(1);
        submissions.forEach(submission => expect(submission.state).toBe('PENDING'));
        done();
    },10000);
});