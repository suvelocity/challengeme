const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const { User, UserTeam, Team } = require('../../../models');
const userMock = require('../../mocks/users');
const userTeamMock = require('../../mocks/usersTeams');
const teamMock = require('../../mocks/teams');

function generateToken(currentUser) {
  const infoForCookie = {
    userId: currentUser.id,
    userName: currentUser.userName,
  };
  return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '900s',
  });
}

describe('Testing teams routes', () => {
  beforeEach(async () => {
    await User.destroy({ truncate: true, force: true });
    await UserTeam.destroy({ truncate: true, force: true });
    await Team.destroy({ truncate: true, force: true });
  });

  test('Can admin get all teams information', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const allTeamInformation = await request(app)
      .get('/api/v1/teams/all-teams')
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(allTeamInformation.status).toBe(200);
    expect(allTeamInformation.body.length).toBe(teamMock.length);

    const unauthorized = await request(app)
      .get('/api/v1/teams/all-teams')
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Can admin get one team information', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const oneTeamInformation = await request(app)
      .get(`/api/v1/teams/single-team/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(oneTeamInformation.status).toBe(200);
    expect(oneTeamInformation.body.length).toBe(1);

    const unauthorized = await request(app)
      .get(`/api/v1/teams/single-team/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Can admin create new team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const newTeamCreation = await request(app)
      .post('/api/v1/teams/create-team')
      .send({ name: 'test' })
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(newTeamCreation.status).toBe(201);

    const allTeamInformation = await request(app)
      .get('/api/v1/teams/all-teams')
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(allTeamInformation.status).toBe(200);
    expect(allTeamInformation.body.length).toBe(teamMock.length + 1);

    const unauthorized = await request(app)
      .post('/api/v1/teams/create-team')
      .send({ name: 'test' })
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Can admin change user permission on team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const studentUnauthorized = await request(app)
      .get(`/api/v1/teams/teacher-area/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(studentUnauthorized.status).toBe(401);

    const changeUserPermission = await request(app)
      .patch(`/api/v1/teams/permission/${teamMock[0].id}`)
      .send({ userId: userMock[1].id, permission: 'teacher' })
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(changeUserPermission.status).toBe(200);

    const studentBecomeTeacher = await request(app)
      .get(`/api/v1/teams/teacher-area/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(studentBecomeTeacher.status).toBe(200);

    const unauthorized = await request(app)
      .patch(`/api/v1/teams/permission/${teamMock[0].id}`)
      .send({ userId: userMock[1].id, permission: 'teacher' })
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Can admin delete team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const newTeamCreation = await request(app)
      .delete(`/api/v1/teams/remove-team/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(newTeamCreation.status).toBe(204);

    const allTeamInformation = await request(app)
      .get('/api/v1/teams/all-teams')
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(allTeamInformation.status).toBe(200);
    expect(allTeamInformation.body.length).toBe(teamMock.length - 1);

    const unauthorized = await request(app)
      .delete(`/api/v1/teams/remove-team/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });
});
