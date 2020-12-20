const request = require('supertest');
const { generateToken } = require('../../utils');
const app = require('../../../app');
const { User, UserTeam, Team } = require('../../../models');
const { usersMock, teamsMock, usersTeamsMock } = require('../../mocks');

describe('Testing teams routes', () => {
  beforeAll(async () => {
    await User.destroy({ truncate: true, force: true });
    await UserTeam.destroy({ truncate: true, force: true });
    await Team.destroy({ truncate: true, force: true });

    await User.bulkCreate(usersMock);
    await UserTeam.bulkCreate(usersTeamsMock);
    await Team.bulkCreate(teamsMock);
  });

  test('Can user get info about his team', async (done) => {
    const teamInformation = await request(app)
      .get(`/api/v1/teams/team-page/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(teamInformation.status).toBe(200);
    expect(teamInformation.body.id).toBe(teamsMock[0].id);

    done();
  });

  test("Can user can't get info about other team", async (done) => {
    const teamInformation = await request(app)
      .get(`/api/v1/teams/team-page/${teamsMock[1].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(teamInformation.status).toBe(401);

    done();
  });

  test('Can user get all teams information he belongs to', async (done) => {
    const teamsInformation = await request(app)
      .get('/api/v1/teams/all-teams-by-user')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(teamsInformation.status).toBe(200);

    const allTeamsByUser = usersTeamsMock.filter((team) => team.userId === usersMock[0].id);

    expect(teamsInformation.body.Teams).toHaveLength(allTeamsByUser.length);

    done();
  });
});
