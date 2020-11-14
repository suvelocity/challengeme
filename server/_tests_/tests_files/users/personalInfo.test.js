const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const { User } = require('../../../models');
const mockUser = require('../../mocks/users');

function generateToken(currentUser) {
  const infoForCookie = {
    userId: currentUser.id,
    userName: currentUser.userName,
  };
  return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '900s',
  });
}

describe('Testing users routes', () => {
  beforeEach(async () => {
    await User.destroy({ truncate: true, force: true });
  });

  test('Can user get info about himself', async (done) => {
    await User.bulkCreate(mockUser);

    const userInformation = await request(app)
      .get('/api/v1/users/info')
      .set('authorization', `bearer ${generateToken(mockUser[0])}`);

    expect(userInformation.status).toBe(200);
    expect(userInformation.body.githubAccount).toBe(mockUser[0].githubAccount);
    done();
  });

  test('Can admin get info about all users', async (done) => {
    await User.bulkCreate(mockUser);

    const userInformation = await request(app)
      .get('/api/v1/users/all')
      .set('authorization', `bearer ${generateToken(mockUser[2])}`);

    expect(userInformation.status).toBe(200);
    expect(userInformation.body.length).toBe(mockUser.length);

    const unauthorized = await request(app)
      .get('/api/v1/users/all')
      .set('authorization', `bearer ${generateToken(mockUser[0])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Can admin change user permission', async (done) => {
    await User.bulkCreate(mockUser);

    const beforePermission = await request(app)
      .patch('/api/v1/users/permission')
      .set('authorization', `bearer ${generateToken(mockUser[0])}`);

    expect(beforePermission.status).toBe(401);

    const changePermission = await request(app)
      .patch('/api/v1/users/permission')
      .send({ permission: 'admin', userName: mockUser[0].userName })
      .set('authorization', `bearer ${generateToken(mockUser[2])}`);

    expect(changePermission.status).toBe(200);

    const allUsersWithPermission = await request(app)
      .get('/api/v1/users/all')
      .set('authorization', `bearer ${generateToken(mockUser[0])}`);

    expect(allUsersWithPermission.status).toBe(200);
    expect(allUsersWithPermission.body.length).toBe(mockUser.length);

    done();
  });
});
