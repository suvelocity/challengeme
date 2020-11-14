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

  test('Can teacher get info about his team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const teamInformation = await request(app)
      .get(`/api/v1/teams/teacher-area/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamInformation.status).toBe(200);

    const unauthorized = await request(app)
      .get(`/api/v1/teams/teacher-area/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/teams/teacher-area/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

  test('Can teacher add user to team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const teamInformation = await request(app)
      .get(`/api/v1/teams/team-page/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamInformation.status).toBe(200);
    expect(teamInformation.body[0].Users.length).toBe(userTeamMock.filter((connection) => connection.teamId === teamMock[0].id).length);

    const addUser = await request(app)
      .post(`/api/v1/teams/add-users/${teamMock[0].id}`)
      .send({ newUsers: [{ value: 3 }] })
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(addUser.status).toBe(201);

    const teamInformationAfterAdded = await request(app)
      .get(`/api/v1/teams/team-page/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamInformationAfterAdded.status).toBe(200);
    expect(teamInformationAfterAdded.body[0].Users.length).toBe(userTeamMock.filter((connection) => connection.teamId === teamMock[0].id).length + 1);

    const unauthorized = await request(app)
      .post(`/api/v1/teams/add-users/${teamMock[0].id}`)
      .send({ newUsers: [{ value: 3 }] })
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotTeacherInTeam = await request(app)
      .post(`/api/v1/teams/add-users/${teamMock[0].id}`)
      .send({ newUsers: [{ value: 4 }] })
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(adminNotTeacherInTeam.status).toBe(201);

    done();
  });

  test('Can teacher add user to team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const teamInformation = await request(app)
      .get(`/api/v1/teams/team-page/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamInformation.status).toBe(200);
    expect(teamInformation.body[0].Users.length).toBe(userTeamMock.filter((connection) => connection.teamId === teamMock[0].id).length);

    const addUser = await request(app)
      .delete(`/api/v1/teams/remove-user/${teamMock[0].id}`)
      .query({ userId: 2 })
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(addUser.status).toBe(204);

    const teamInformationAfterRemoved = await request(app)
      .get(`/api/v1/teams/team-page/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamInformationAfterRemoved.status).toBe(200);
    expect(teamInformationAfterRemoved.body[0].Users.length).toBe(userTeamMock.filter((connection) => connection.teamId === teamMock[0].id).length - 1);

    const unauthorized = await request(app)
      .delete(`/api/v1/teams/remove-user/${teamMock[0].id}`)
      .query({ userId: 1 })
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotTeacherInTeam = await request(app)
      .delete(`/api/v1/teams/remove-user/${teamMock[0].id}`)
      .query({ userId: 1 })
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(adminNotTeacherInTeam.status).toBe(204);

    done();
  });
});
