/**
 * @jest-environment node
 */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const nock = require('nock');
const getCurrentBranch = require('../../../helpers/getCurrentBranch');
const { Submission, Challenge, User, Review, } = require('../../../models');
const challengesMock = require('../../mocks/challenges');
const mockUser = require('../../mocks/users');
const submissionsMock = require('../../mocks/submissions');
const reviewsMock = require('../../mocks/reviews');


describe('Submission process', () => {
  beforeAll(async () => {
    await Challenge.destroy({ truncate: true, force: true });
    await Submission.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
    await Review.destroy({ truncate: true, force: true });
  });

  test('Posting submission and status change to PENDING + can Post Submissions that had FAIL status', async () => {
    const ref = await getCurrentBranch();
    process.env.MY_BRANCH = ref;
    process.env.MY_URL = 'testingAddress';
    await Challenge.bulkCreate(challengesMock);
    await User.bulkCreate(mockUser);

    const user = await User.findOne({
      where: { email: mockUser[0].email },
    });

    const accessToken = jwt.sign({
      userId: user.dataValues.id,
      userName: user.dataValues.userName
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    const challenges = await Challenge.findAll();

    const challengeType = challenges.find((challenge) => challenge.id === submissionsMock[0].challengeId).type;

    const testRepo = challenges.find((challenge) => challenge.id === submissionsMock[0].challengeId).repositoryName;

    const githubPostMock1 = nock('https://api.github.com', {
      reqHeaders: {
        'Content-Type': 'application/json',
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    })
      .post(`/repos/${process.env.GITHUB_REPO}/actions/workflows/${challengeType}.yml/dispatches`,
        {
          ref,
          inputs: {
            testRepo,
            solutionRepo: submissionsMock[0].solutionRepository,
            webhookUrl: `testingAddress/api/v1/webhook/submission/${1}`,
            bearerToken: accessToken,
          },
        })
      .reply(200);

    const challengeType1 = challenges.find((challenge) => challenge.id === submissionsMock[1].challengeId).type;
    const testRepo1 = challenges.find((challenge) => challenge.id === submissionsMock[1].challengeId).repositoryName;

    const githubPostMock2 = nock('https://api.github.com', {
      reqHeaders: {
        'Content-Type': 'application/json',
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    })
      .post(`/repos/${process.env.GITHUB_REPO}/actions/workflows/${challengeType1}.yml/dispatches`,
        {
          ref,
          inputs: {
            testRepo: testRepo1,
            solutionRepo: submissionsMock[1].solutionRepository,
            webhookUrl: `testingAddress/api/v1/webhook/submission/${2}`,
            bearerToken: accessToken,
          },
        })
      .reply(200);

    const challengeType2 = challenges.find((challenge) => challenge.id === submissionsMock[2].challengeId).type;
    const testRepo2 = challenges.find((challenge) => challenge.id === submissionsMock[2].challengeId).repositoryName;

    const githubPostMock3 = nock('https://api.github.com', {
      reqHeaders: {
        'Content-Type': 'application/json',
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    })
      .post(`/repos/${process.env.GITHUB_REPO}/actions/workflows/${challengeType2}.yml/dispatches`,
        {
          ref,
          inputs: {
            testRepo: testRepo2,
            solutionRepo: submissionsMock[2].solutionRepository,
            webhookUrl: `testingAddress/api/v1/webhook/submission/${3}`,
            bearerToken: accessToken,
          },
        })
      .reply(200);

    const firstReview = reviewsMock.find((review) =>
      review.userId === mockUser[0].id && review.challengeId === submissionsMock[0].challengeId)

    await request(app)
      .post(`/api/v1/submissions/apply/${submissionsMock[0].challengeId}`)
      .set('authorization', `bearer ${accessToken}`)
      .send({ repository: submissionsMock[0].solutionRepository, ...firstReview });

    const secondReview = reviewsMock.find((review) =>
      review.userId === mockUser[0].id && review.challengeId === submissionsMock[1].challengeId)

    await request(app)
      .post(`/api/v1/submissions/apply/${submissionsMock[1].challengeId}`)
      .set('authorization', `bearer ${accessToken}`)
      .send({ repository: submissionsMock[1].solutionRepository, ...secondReview });

    const thirdReview = reviewsMock.find((review) =>
      review.userId === mockUser[0].id && review.challengeId === submissionsMock[2].challengeId)

    await request(app)
      .post(`/api/v1/submissions/apply/${submissionsMock[2].challengeId}`)
      .set('authorization', `bearer ${accessToken}`)
      .send({ repository: submissionsMock[2].solutionRepository, ...thirdReview });

    expect(githubPostMock1.isDone()).toEqual(true);
    expect(githubPostMock2.isDone()).toEqual(true);
    expect(githubPostMock3.isDone()).toEqual(true);

    const submissions = await Submission.findAll();
    expect(submissions.length).toBe(3);
    submissions.forEach((submission) => expect(submission.state).toBe('PENDING'));

  }, 10000);

  test('webhook simulation, state change from PENDING to SUCCESS or FAIL', async () => {
    const submissions = await Submission.findAll();

    const user = await User.findOne({
      where: { email: mockUser[0].email },
    });

    const accessToken = jwt.sign({
      userId: user.dataValues.id,
      userName: user.dataValues.userName
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    const successId = submissions.find((submission) => submission.solutionRepository === submissionsMock[0].solutionRepository).id;
    const successId2 = submissions.find((submission) => submission.solutionRepository === submissionsMock[1].solutionRepository).id;
    const failId = submissions.find((submission) => submission.solutionRepository === submissionsMock[2].solutionRepository).id;

    await request(app)
      .patch(`/api/v1/webhook/submission/${successId}`)
      .set('authorization', `bearer ${accessToken}`)
      .send({ success: true });

    await request(app)
      .patch(`/api/v1/webhook/submission/${successId2}`)
      .set('authorization', `bearer ${accessToken}`)
      .send({ success: true });

    await request(app)
      .patch(`/api/v1/webhook/submission/${failId}`)
      .set('authorization', `bearer ${accessToken}`)
      .send({ success: false });

    const expectedSuccess = await Submission.findByPk(successId);
    const expectedSuccess2 = await Submission.findByPk(successId2);
    const expectedFail = await Submission.findByPk(failId);

    expect(expectedSuccess.state).toBe('SUCCESS');
    expect(expectedSuccess2.state).toBe('SUCCESS');
    expect(expectedFail.state).toBe('FAIL');

  });
});
