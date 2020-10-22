const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const { Image } = require('../../models');
const imageMock = require('../mocks/images');
const userMock = require('../mocks/user');

function generateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '900s' });
}

describe('testing challenges endpoints', () => {
  beforeEach(async () => {
    await Image.destroy({ truncate: true, force: true });
  });

  it('Can get image by challange id', async (done) => {
    await Image.bulkCreate(imageMock);
    const { body } = await request(app).get('/api/v1/image?id=2')
      .set('authorization', `bearer ${generateToken(userMock)}`);
    expect(body.challengeId).toBe(2);
    done();
  });

  it('Can post image to a challange, sends an error if image already exists', async (done) => {
    await request(app).post('/api/v1/image').send(imageMock[0])
      .set('authorization', `bearer ${generateToken(userMock)}`)
      .expect(200);
    const { body } = await request(app).get('/api/v1/image?id=2')
      .set('authorization', `bearer ${generateToken(userMock)}`);
    expect(body.challengeId).toBe(2);
    await request(app).post('/api/v1/image').send(imageMock[0])
      .set('authorization', `bearer ${generateToken(userMock)}`)
      .expect(400);
    done();
  });
});
