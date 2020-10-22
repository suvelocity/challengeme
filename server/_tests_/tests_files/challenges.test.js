const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const {
  Challenge, Label, LabelChallenge, Submission, User,
} = require('../../models');
const challengesMock = require('../mocks/challenges');
const labelsMock = require('../mocks/labels');
const usersMock = require('../mocks/users');
const submissionsMock = require('../mocks/submissions');

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

  it('Can get all challenges', async (done) => {
    await Challenge.bulkCreate(challengesMock);
    const response = await request(app)
      .get('/api/v1/challenges')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(10);
    done();
  });

  it('Can get challenge by name', async (done) => {
    await Challenge.bulkCreate(challengesMock);
    const response = await request(app)
      .get('/api/v1/challenges?name=React - Calculator')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('React - Calculator');
    done();
  });

  it('Can get all github types', async (done) => {
    const response = await request(app)

      .get('/api/v1/types')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);
    expect(response.body.length).toBe(8);

    expect(response.status).toBe(200);
    done();
  });

  it('Can get all labels', async (done) => {
    await Label.bulkCreate(labelsMock);
    const response = await request(app)
      .get('/api/v1/labels')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);
    expect(response.body.length).toBe(11);
    expect(response.status).toBe(200);
    done();
  });

  it('Can get submission per certain challenge for logged user ', async (done) => {
    await Challenge.bulkCreate(challengesMock);
    await User.bulkCreate(usersMock);
    await Submission.bulkCreate(submissionsMock);
    const response = await request(app)
      .get('/api/v1/challenges/1/dek12345/submission')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);
    expect(response.body.userId).toBe(1);
    expect(response.body.state).toBe('SUCCESS');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(false);
    done();
  });

  xit("Can post new challenge - send error if challenge's repo is already exists", async (done) => {
    await request(app).post('/api/v1/challenges').send(challengesMock[0])
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);
    const response = await request(app).get('/api/v1/challenges?challengeName=JWT - Node.js')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`)
      .expect(200);
    console.log('challenge:', response.body);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('JWT - Node.js');
    await request(app).post('/api/v1/challenges').send(challengesMock[0])
      .set('authorization', `bearer ${generateToken(usersMock[0])}`)
      .expect(500);
    done();
  });
});
