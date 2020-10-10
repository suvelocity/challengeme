const request = require('supertest');
const app = require('../app');
const { Challenge } = require('../models');
const newChallengeMock = require ('./mocks/newChallengeMock');


describe('testing new-challenge endpoints', () => {

  beforeEach(async () => {
    await Challenge.destroy({ truncate: true, force: true });
  });

  it("Can post new challenge - send error if challenge's repo is already exists", async (done) => {
    await request(app).post('/api/v1/new-challenge').send(newChallengeMock).expect(200);
    const { body } = await request(app).get('/api/v1/challenges?challengeName=JWT - Node.js');
    expect(body.length).toBe(1);
    expect(body[0].name).toBe('JWT - Node.js');
    await request(app).post('/api/v1/new-challenge').send(newChallengeMock).expect(500);
    done()
  })

  it("Can get all github types", async (done) => {
    const { body } = await request(app).get('/api/v1/new-challenge/type');
    expect(body.length).toBe(6)
    done()
  })

})