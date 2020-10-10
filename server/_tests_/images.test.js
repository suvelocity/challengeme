const request = require('supertest');
const app = require('../app');
const { Image } = require('../models');
const imageMock = require('./mocks/images');


describe('testing challenges endpoints', () => {

  beforeEach(async () => {
    await Image.destroy({ truncate: true, force: true });
  });

  it('Can get image by challange id', async (done) => {
    await Image.bulkCreate(imageMock)
    const { body } = await request(app).get('/api/v1/image?id=2');
    expect(body.challengeId).toBe(2);
    done()
  })
  
  it('Can post image to a challange, sends an error if image already exists', async (done) => {
    await request(app).post('/api/v1/image').send(imageMock[0]).expect(200);
    const { body } = await request(app).get('/api/v1/image?id=2');
    expect(body.challengeId).toBe(2);
    await request(app).post('/api/v1/image').send(imageMock[0]).expect(400);
    done()
  })

})