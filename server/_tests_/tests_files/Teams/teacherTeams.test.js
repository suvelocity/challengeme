const request = require('supertest');
const { generateToken } = require('../../Functions');
const app = require('../../../app');
const { User, UserTeam, Team } = require('../../../models');
const userMock = require('../../mocks/users');
const userTeamMock = require('../../mocks/usersTeams');
const teamMock = require('../../mocks/teams');
const {  Op } = require('sequelize');

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

  test('Teacher can get info about all users from his Team (deleted included)', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const userInformation = await request(app)
      .get(`/api/v1/users/teacher/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(userInformation.status).toBe(200);
    expect(userInformation.body.length).toBe(userTeamMock.filter(x=>x.teamId===teamMock[0].id).length);

    await UserTeam.destroy({
      where: {
        [Op.and]: [
          { userId: userMock[2].id },
          { teamId: teamMock[0].id },
        ],
      },
    });

    const userInformationAfterDelete = await request(app)
    .get(`/api/v1/users/teacher/${teamMock[0].id}`)
    .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(userInformationAfterDelete.status).toBe(200);
    expect(userInformationAfterDelete.body.length).toBe(userTeamMock.filter(x=>x.teamId===teamMock[0].id).length);

    const unauthorized = await request(app)
      .get(`/api/v1/users/teacher/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });
});
