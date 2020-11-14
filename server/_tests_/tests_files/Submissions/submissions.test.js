const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const {
  Challenge, Label, LabelChallenge, Submission, User,
} = require('../../../models');
const challengesMock = require('../../mocks/challenges');
const mockUser = require('../../mocks/users');
const submissionsMock = require('../../mocks/submissions');

function generateToken(currentUser) {
  const infoForCookie = {
    userId: currentUser.id,
    userName: currentUser.userName,
  };
  return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '900s',
  });
}

describe('testing challenges endpoints', () => {
  beforeEach(async () => {
    await Challenge.destroy({ truncate: true, force: true });
    await Label.destroy({ truncate: true, force: true });
    await LabelChallenge.destroy({ truncate: true, force: true });
    await Submission.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
  });

  test('Can get submission per certain challenge for logged user ', async (done) => {
    await Challenge.bulkCreate(challengesMock);
    await User.bulkCreate(mockUser);
    const lastSubmissionMock = submissionsMock.splice(submissionsMock.length - 1, submissionsMock.length);
    await Submission.bulkCreate(submissionsMock);
    await Submission.create(lastSubmissionMock[0]);

    const lastSubmission = await request(app)
      .get(`/api/v1/submissions/by-user/${challengesMock[0].id}`)
      .set('authorization', `bearer ${generateToken(mockUser[0])}`);

    expect(lastSubmission.status).toBe(200);
    expect(lastSubmission.body.userId).toBe(mockUser[0].id);
    expect(lastSubmission.body.state).toBe(lastSubmissionMock[0].state);
    expect(Array.isArray(lastSubmission.body)).toBe(false);
    done();
  });

  test('Can get all submissions per challenge', async (done) => {
    await Challenge.bulkCreate(challengesMock);
    await User.bulkCreate(mockUser);
    await Submission.bulkCreate(submissionsMock);

    const allSubmissionsChallenge = await request(app)
      .get(`/api/v1/submissions/${challengesMock[0].id}`)
      .set('authorization', `bearer ${generateToken(mockUser[0])}`);

    expect(allSubmissionsChallenge.status).toBe(200);
    expect(allSubmissionsChallenge.body.length).toBe(submissionsMock.filter((submission) => submission.challengeId === challengesMock[0].id).length);
    done();
  });
});
