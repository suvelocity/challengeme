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

  test('Can user get info about his team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const teamInformation = await request(app)
      .get(`/api/v1/teams/team-page/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamInformation.status).toBe(200);
    expect(teamInformation.body[0].id).toBe(teamMock[0].id);
    expect(teamInformation.body[1].permission).toBe(userTeamMock.filter((connection) => connection.userId === userMock[0].id && connection.teamId === teamMock[0].id)[0].permission);

    done();
  });

  test("Can user can't get info about other team", async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const teamInformation = await request(app)
      .get(`/api/v1/teams/team-page/${teamMock[1].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(teamInformation.status).toBe(401);

    done();
  });

  test('Can user get all teams information he belongs to', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);

    const teamsInformation = await request(app)
      .get('/api/v1/teams/all-teams-by-user')
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamsInformation.status).toBe(200);
    expect(teamsInformation.body.Teams.length).toBe(2);

    done();
  });
});
