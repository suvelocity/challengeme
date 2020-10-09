const request = require('supertest');
const app = require('../app');
const { Image } = require('../models');
// const challengesMock = require ('./mocks/challenges');


describe('testing challenges endpoints', () => {

  beforeEach(async () => {
    await Image.destroy({ truncate: true, force: true });
  });

  it('Can get image by challange id', async (done) => {
    await Image.bulkCreate(imageMock)
    const { body } = await request(app).get('/api/v1/image?id=2');
    console.log('image:', body);
    expect(body.length).toBe(1);
    expect(body[0].challengeId).toBe(2);
    done()
  })

  it('Can post image to a challange, sends an error if image already exists', async (done) => {
    // await Image.bulkCreate(challengesMock)
    request(app).post('/api/v1/image', imageMock);
    const { body } = await request(app).get('/api/v1/image?id=2');
    expect(body[0].img).toBe(imageMock);
    request(app).post('/api/v1/image', imageMock).expect(400);
    done()
  })

})