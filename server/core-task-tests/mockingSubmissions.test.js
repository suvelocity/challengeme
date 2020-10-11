/**
 * @jest-environment node
 */
const request = require('supertest');
const app = require('../app');
const {Submission, Challenge} = require('../models');
const {challengeArr, solutionRepos, failRepos} = require('./mockData');
const nock = require('nock');
const { default: Axios } = require('axios');

describe('Submission process', () => {
    beforeAll(async (done) => {
        await Challenge.destroy({ truncate: true, force: true });
        await Submission.destroy({ truncate: true, force: true });
        await Challenge.bulkCreate(challengeArr);
        await Submission.create({
          challengeId: solutionRepos[0].challengeId,
          state: 'FAIL',
          solutionRepository: solutionRepos[0].repo
        });
        await Submission.create({
          challengeId: failRepos[0].challengeId,
          state: 'FAIL',
          solutionRepository: failRepos[0].repo
        });
        console.log(solutionRepos)
        process.env.MY_URL = 'TheWebHookUrl';
        console.log(process.env.MY_URL)
        done();
      });
    test('Posting submisson and status change to PENDING + can Post Submissions that had FAIL status', async () => {
        const challenges = await Challenge.findAll();
        let initialSubmissions = await Submission.findAll();
        expect(initialSubmissions.length).toBe(2);
        let challengeType = challenges.find(challenge => challenge.id === solutionRepos[0].challengeId).type;
        let testRepo = challenges.find(challenge=> challenge.id === solutionRepos[0].challengeId).repositoryName;
        const successId = initialSubmissions.find(submission => submission.solutionRepository === solutionRepos[0].repo).id;
        let webhookUrl = process.env.MY_URL.concat(`/api/v1/webhook/submission/${successId}`);
        
        const githubPostmock1 = nock(`https://api.github.com`, {reqHeaders: {
          'Content-Type': 'application/json',
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
      }})
        .post(`/repos/${process.env.GITHUB_REPO}/actions/workflows/${challengeType}.yml/dispatches`,
        {
            ref: 'master',
            inputs: {              
              testRepo: testRepo,
              solutionRepo: solutionRepos[0].repo,
              webhookUrl: webhookUrl
            }
        })
        .reply(200)


        challengeType = challenges.find(challenge => challenge.id === failRepos[0].challengeId).type;
        testRepo = challengeArr.find(challenge=> challenge.id === failRepos[0].challengeId).repositoryName;
        const failId = initialSubmissions.find(submission => submission.solutionRepository === failRepos[0].repo).id;
        webhookUrl = process.env.MY_URL.concat(`/api/v1/webhook/submission/${failId}`);
        const githubPostmock2 = nock(`https://api.github.com`, {reqHeaders: {
          'Content-Type': 'application/json',
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
      }})
        .post(`/repos/${process.env.GITHUB_REPO}/actions/workflows/${challengeType}.yml/dispatches`,
        {
            ref: 'master',
            inputs: {              
              testRepo: testRepo,
              solutionRepo: failRepos[0].repo,
              webhookUrl: webhookUrl
            }
        })
        .reply(200)


        challengeType = challenges.find(challenge => challenge.id === solutionRepos[1].challengeId).type;
        testRepo = challengeArr.find(challenge=> challenge.id === solutionRepos[1].challengeId).repositoryName;
        webhookUrl = process.env.MY_URL.concat(`/api/v1/webhook/submission/${3}`);
        const githubPostmock3 = nock(`https://api.github.com`, {reqHeaders: {
          'Content-Type': 'application/json',
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
      }})
        .post(`/repos/${process.env.GITHUB_REPO}/actions/workflows/${challengeType}.yml/dispatches`,
        {
            ref: 'master',
            inputs: {              
              testRepo: testRepo,
              solutionRepo: solutionRepos[1].repo,
              webhookUrl: webhookUrl
            }
        })
        .reply(200)


        await request(app).post(`/api/v1/challenges/${solutionRepos[0].challengeId}/apply`).send({solutionRepository:solutionRepos[0].repo});
        await request(app).post(`/api/v1/challenges/${failRepos[0].challengeId}/apply`).send({solutionRepository:failRepos[0].repo});
        await request(app).post(`/api/v1/challenges/${solutionRepos[1].challengeId}/apply`).send({solutionRepository:solutionRepos[1].repo});
        expect(githubPostmock1.isDone()).toEqual(true);
        expect(githubPostmock2.isDone()).toEqual(true);
        expect(githubPostmock3.isDone()).toEqual(true);


        let submissions = await Submission.findAll();
        expect(submissions.length).toBe(3);
        submissions.forEach(submission => expect(submission.state).toBe('PENDING'));
        
    },10000);
    test('webhook simulation, state change from PENDING to SUCCESS or FAIL', async () => {
      let submissions = await Submission.findAll();
      const successId = submissions.find(submission => submission.solutionRepository === solutionRepos[0].repo).id;
      const successId2 = submissions.find(submission => submission.solutionRepository === solutionRepos[1].repo).id;
      const failId = submissions.find(submission => submission.solutionRepository === failRepos[0].repo).id;
      await request(app).patch(`/api/v1/webhook/submission/${successId}`).send({success: true });
      await request(app).patch(`/api/v1/webhook/submission/${successId2}`).send({success: true });
      await request(app).patch(`/api/v1/webhook/submission/${failId}`).send({success: false });
      const expectedSuccess = await Submission.findByPk(successId);
      const expectedSuccess2 = await Submission.findByPk(successId2)
      const expectedFail = await Submission.findByPk(failId);
      expect(expectedSuccess.state).toBe('SUCCESS')
      expect(expectedSuccess2.state).toBe('SUCCESS')
      expect(expectedFail.state).toBe('FAIL')
    });

});