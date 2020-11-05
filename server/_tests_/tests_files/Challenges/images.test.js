const request = require('supertest');
const jwt = require("jsonwebtoken");
const app = require("../../../app");
const { Image } = require('../../../models');
const imageMock = require('../../mocks/images');
const usersMock = require('../../mocks/users')

function generateToken(currentUser) {
  const infoForCookie = {
    userId: currentUser.id,
    userName: currentUser.userName,
  };
  return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "900s",
  });
}

describe('testing challenges endpoints', () => {

  beforeEach(async () => {
    await Image.destroy({ truncate: true, force: true });
  });

  test('Can get image by challange id', async (done) => {
    await Image.bulkCreate(imageMock)
    const imageResponse = await request(app)
      .get('/api/v1/image?id=2')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(imageResponse.status).toBe(200);
    expect(imageResponse.body.challengeId).toBe(2);
    done()
  })

  test('Can post image to a challange, sends an error if image already exists', async (done) => {
    const newImage = await request(app)
      .post('/api/v1/image')
      .send(imageMock[1])
      .set('authorization', `bearer ${generateToken(usersMock[0])}`)

    expect(newImage.status).toBe(200);

    const imageResponse = await request(app)
      .get('/api/v1/image?id=2')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);
    expect(imageResponse.status).toBe(200);
    expect(imageResponse.body.challengeId).toBe(2);


    const alreadtExistImage = await request(app)
      .post('/api/v1/image')
      .send(imageMock[1])
      .set('authorization', `bearer ${generateToken(usersMock[0])}`)

    expect(alreadtExistImage.status).toBe(400);
    done()
  })

})