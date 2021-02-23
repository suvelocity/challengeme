const request = require('supertest');
const app = require('../../../app');
const { User } = require('../../../models');
const { generateToken } = require('../../utils');
const { usersMock } = require('../../mocks');

describe('Testing users routes', () => {
  beforeEach(async () => {
    await User.destroy({ truncate: true, force: true });
  });

  test('Can user get info about himself', async (done) => {
    await User.bulkCreate(usersMock);

    const userInformation = await request(app)
      .get('/api/v1/users/info')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(userInformation.status).toBe(200);
    expect(userInformation.body.githubAccount).toBe(usersMock[0].githubAccount);
    done();
  });

  test('Can user change his password', async (done) => {
    await User.bulkCreate(usersMock);

    const passwordIdentical = await request(app)
      .patch('/api/v1/users/change-password')
      .send({ oldPassword: '12345678', newPassword: '12345678' })
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(passwordIdentical.status).toBe(409);
    expect(passwordIdentical.body.message).toBe('You should choose new password');

    const incorrectPassword = await request(app)
      .patch('/api/v1/users/change-password')
      .send({ oldPassword: '00000000', newPassword: '87654321' })
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(incorrectPassword.status).toBe(400);
    expect(incorrectPassword.body.message).toBe('Old Password Incorrect');

    const changePasswordSuccessfully = await request(app)
      .patch('/api/v1/users/change-password')
      .send({ oldPassword: '12345678', newPassword: '87654321' })
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(changePasswordSuccessfully.status).toBe(400);
    expect(changePasswordSuccessfully.body.message).toBe('Old Password Incorrect');

    const unauthorized = await request(app)
      .patch('/api/v1/users/change-password')
      .send({ oldPassword: '12345678', newPassword: '87654321' });

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Can user change his personal information about himself', async (done) => {
    await User.bulkCreate(usersMock);

    const {
      firstName, lastName, birthDate, country, city, githubAccount,
    } = usersMock[1];

    const changePersonalDetailsSuccessfully = await request(app)
      .patch('/api/v1/users/info')
      .send({
        firstName, lastName, birthDate, country, city, githubAccount,
      })
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(changePersonalDetailsSuccessfully.status).toBe(200);
    expect(changePersonalDetailsSuccessfully.body.message).toBe('Updated Personal Details Success');

    const afterChangeUser = await User.findOne({
      where: {
        userName: usersMock[0].userName,
      },
    });

    expect(afterChangeUser.userName).toBe(usersMock[0].userName);
    expect(afterChangeUser.firstName).toBe(firstName);
    expect(afterChangeUser.lastName).toBe(lastName);
    expect(afterChangeUser.birthDate).toStrictEqual(birthDate);
    expect(afterChangeUser.country).toBe(country);
    expect(afterChangeUser.city).toBe(city);
    expect(afterChangeUser.githubAccount).toBe(githubAccount);

    const unauthorized = await request(app)
      .patch('/api/v1/users/info')
      .send({
        firstName, lastName, birthDate, country, city, githubAccount,
      });

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Can admin get info about all users', async (done) => {
    await User.bulkCreate(usersMock);

    const userInformation = await request(app)
      .get('/api/v1/users/admin')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(userInformation.status).toBe(200);
    expect(userInformation.body).toHaveLength(usersMock.length);

    const unauthorized = await request(app)
      .get('/api/v1/users/admin')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Can admin change user permission', async (done) => {
    await User.bulkCreate(usersMock);

    const beforePermission = await request(app)
      .patch(`/api/v1/users/permission/${usersMock[0].id}`)
      .send({ permission: 'admin' })
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(beforePermission.status).toBe(401);

    const changePermission = await request(app)
      .patch(`/api/v1/users/permission/${usersMock[0].id}`)
      .send({ permission: 'admin' })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(changePermission.status).toBe(200);

    const allUsersWithPermission = await request(app)
      .get('/api/v1/users/admin')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(allUsersWithPermission.status).toBe(200);
    expect(allUsersWithPermission.body).toHaveLength(usersMock.length);

    done();
  });
});
