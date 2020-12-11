/**
 * @jest-environment node
 */
const request = require('supertest');
const nock = require('nock');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const { getCurrentBranch } = require('../../../helpers');
const {
  Submission, Challenge, User, Review,
} = require('../../../models');
const {
  usersMock, reviewsMock, submissionsMock, challengesMock,
} = require('../../mocks');

function generateToken(currentUser) {
  const infoForCookie = {
    userId: currentUser.id,
    userName: currentUser.userName,
  };
  return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
}

describe('Submission process', () => {
  beforeEach(async () => {
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
    await User.bulkCreate(usersMock);

    const challengeInfo = await Challenge.findOne({
      where: {
        id: submissionsMock[0].challengeId,
      },
    });

    const githubPostMock1 = nock('https://api.github.com', {
      reqHeaders: {
        'Content-Type': 'application/json',
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    })
      .post(`/repos/${process.env.GITHUB_REPO}/actions/workflows/${challengeInfo.type}.yml/dispatches`,
        {
          ref,
          inputs: {
            testRepo: challengeInfo.repositoryName,
            solutionRepo: submissionsMock[0].solutionRepository,
            webhookUrl: `testingAddress/api/v1/webhook/submission/${1}`,
            bearerToken: generateToken(usersMock[0]),
          },
        })
      .reply(200);

    const submissionReview = reviewsMock.find((review) => review.userId === usersMock[0].id && review.challengeId === submissionsMock[0].challengeId);

    await request(app)
      .post(`/api/v1/submissions/apply/${submissionsMock[0].challengeId}`)
      .set('authorization', `bearer ${generateToken(usersMock[0])}`)
      .send({ repository: submissionsMock[0].solutionRepository, ...submissionReview });

    expect(githubPostMock1.isDone()).toEqual(true);

    const submissions = await Submission.findAll();
    expect(submissions.length).toBe(1);
    submissions.forEach((submission) => expect(submission.state).toBe('PENDING'));
  }, 10000);

});
