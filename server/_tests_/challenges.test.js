const request = require('supertest');
const app = require('../app');
const { Challenge, Label, labels_to_challenge } = require('../models');
const challengesMock = require ('./mocks/challenges');
const labelsMock = require ('./mocks/labels');
const labelsToChallengeMock = require('./mocks/labelsToChallenge')


describe('testing challenges endpoints', () => {

  beforeEach(async () => {
    await Challenge.destroy({ truncate: true, force: true });
    await Label.destroy({ truncate: true, force: true });
    await labels_to_challenge.destroy({ truncate: true, force: true });
  });

  it('Can get all challenges', async (done) => {
    await Challenge.bulkCreate(challengesMock)
    const { body } = await request(app).get('/api/v1/challenges');
    console.log('all challenges:', body);
    expect(body.length).toBe(3)
    done()
  })

  it('Can get challenge by name', async (done) => {
    await Challenge.bulkCreate(challengesMock)
    const { body } = await request(app).get('/api/v1/challenges?challengeName=React - Calculator');
    console.log('challenge:', body);
    expect(body.length).toBe(1);
    expect(body[0].name).toBe('React - Calculator');
    done()
  })

  it('Can get challenge by name and filter labels', async (done) => {
    await Challenge.bulkCreate(challengesMock);
    await Label.bulkCreate(labelsMock);
    await labels_to_challenge.bulkCreate(labelsToChallengeMock);
    const { body } = await request(app).get('/api/v1/challenges?challengeName=J&labels=1');
    console.log('challenge:', body);
    expect(body.length).toBe(1);
    expect(body[0].name).toBe('JWT - Node.js');
    done()
  })

  it('Can get all labels', async (done) => {
    await Label.bulkCreate(labelsMock);
    const { body } = await request(app).get('/api/v1/challenges/labels');
    console.log('All labels:', body);
    expect(body.length).toBe(14);
    done()
  })


})