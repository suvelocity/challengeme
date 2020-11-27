const request = require('supertest');
const { generateToken } = require('../../Functions');
const app = require('../../../app');
const { User, UserTeam, Team, Submission } = require('../../../models');
const userMock = require('../../mocks/users');
const userTeamMock = require('../../mocks/usersTeams');
const teamMock = require('../../mocks/teams');
const submissionsMock = require('../../mocks/submissions');

describe('Testing student insights routes', () => {
  beforeEach(async () => {
    await User.destroy({ truncate: true, force: true });
    await UserTeam.destroy({ truncate: true, force: true });
    await Team.destroy({ truncate: true, force: true });
    await Submission.destroy({ truncate: true, force: true });
  });

  test('Student can get insights about his team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);
    await Submission.bulkCreate(submissionsMock);

    const insightsInformation = await request(app)
      .get(`/api/v1/insights/student/top-user/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(insightsInformation.status).toBe(200);
    expect(insightsInformation.body.length <= 5).toBe(true);

    const unauthorized = await request(app)
      .get(`/api/v1/insights/student/top-user/${teamMock[1].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/student/top-user/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

});
