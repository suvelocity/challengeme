const request = require('supertest');
const jwt = require("jsonwebtoken");
const app = require('../app');
const { Challenge, Label, labelsToChallenge } = require('../models');
const challengesMock = require ('./mocks/challenges');
const labelsMock = require ('./mocks/labels');
const labelsToChallengeMock = require('./mocks/labelsToChallenge')
const userMock = require('./mocks/user')

function generateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "900s" });
}

describe('testing challenges endpoints', () => {

  beforeEach(async () => {
    await Challenge.destroy({ truncate: true, force: true });
    await Label.destroy({ truncate: true, force: true });
    await labelsToChallenge.destroy({ truncate: true, force: true });
  });

  it('Can get all challenges', async (done) => {
    await Challenge.bulkCreate(challengesMock)
    const { body } = await request(app).get('/api/v1/challenges')
    .set('authorization', `bearer ${generateToken(userMock)}`);
    console.log('all challenges:', body);
    expect(body.length).toBe(3)
    done()
  })

  it('Can get challenge by name', async (done) => {
    await Challenge.bulkCreate(challengesMock)
    const { body } = await request(app)
    .get('/api/v1/challenges?challengeName=React - Calculator')
    .set('authorization', `bearer ${generateToken(userMock)}`);
    console.log('challenge:', body);
    expect(body.length).toBe(1);
    expect(body[0].name).toBe('React - Calculator');
    done()
  })

  it('Can get challenge by name and filter labels', async (done) => {
    await Challenge.bulkCreate(challengesMock);
    await Label.bulkCreate(labelsMock);
    await labelsToChallenge.bulkCreate(labelsToChallengeMock);
    const { body } = await request(app).get('/api/v1/challenges?challengeName=J&labels=1')
    .set('authorization', `bearer ${generateToken(userMock)}`);
    console.log('challenge:', body);
    expect(body.length).toBe(1);
    expect(body[0].name).toBe('JWT - Node.js');
    done()
  })

  it("Can post new challenge - send error if challenge's repo is already exists", async (done) => {
    await request(app).post('/api/v1/challenges').send(challengesMock[0])
    .set('authorization', `bearer ${generateToken(userMock)}`)
    const { body } = await request(app).get('/api/v1/challenges?challengeName=JWT - Node.js')
    .set('authorization', `bearer ${generateToken(userMock)}`)
    .expect(200);
    console.log('challenge:', body );
    expect(body.length).toBe(1);
    expect(body[0].name).toBe('JWT - Node.js');
    await request(app).post('/api/v1/challenges').send(challengesMock[0])
    .set('authorization', `bearer ${generateToken(userMock)}`)
    .expect(500);
    done()
  })

  it("Can get all github types", async (done) => {
    const { body } = await request(app).get('/api/v1/challenges/type')
    .set('authorization', `bearer ${generateToken(userMock)}`);
    expect(body.length).toBe(6)
    done()
  })

  it('Can get all labels', async (done) => {
    await Label.bulkCreate(labelsMock);
    const { body } = await request(app).get('/api/v1/labels')
    .set('authorization', `bearer ${generateToken(userMock)}`);
    console.log('All labels:', body);
    expect(body.length).toBe(11);
    done()
  })


})