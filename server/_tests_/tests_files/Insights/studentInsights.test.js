const request = require('supertest');
const app = require('../../../app');
const {
  User, UserTeam, Team, Submission, Challenge,
} = require('../../../models');
const {
  generateToken,
  filterUsersByTeam,
  filteredArrayByIds,
  countSuccessAndFailSubmissionsPerChallenge,
  combineSubmissionToUserWithChallenge,
} = require('../../utils');
const {
  usersMock, teamsMock, usersTeamsMock, submissionsMock, challengesMock,
} = require('../../mocks');

describe('Testing student insights routes', () => {
  beforeAll(async () => {
    await Submission.destroy({ truncate: true, force: true });
    await UserTeam.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
    await Team.destroy({ truncate: true, force: true });
    await Challenge.destroy({ truncate: true, force: true });

    await User.bulkCreate(usersMock);
    await Team.bulkCreate(teamsMock);
    await Challenge.bulkCreate(challengesMock);
    await UserTeam.bulkCreate(usersTeamsMock);
    await Submission.bulkCreate(submissionsMock);
  });

  test('Student can get insights about his team', async (done) => {
    const insightsInformation = await request(app)
      .get(`/api/v1/insights/student/top-user/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(insightsInformation.status).toBe(200);
    expect(insightsInformation.body.length <= 5).toBe(true);

    const usersIds = filterUsersByTeam(teamsMock[0], usersTeamsMock);
    const users = filteredArrayByIds(usersMock, usersIds);
    const usersSubmissions = combineSubmissionToUserWithChallenge(users, submissionsMock, challengesMock);
    const formattedMembers = usersSubmissions.map((member) => {
      const { success } = countSuccessAndFailSubmissionsPerChallenge(member.Submissions);
      const { userName } = member;
      return ({ success, userName });
    });

    insightsInformation.body.forEach((element, index) => {
      expect(formattedMembers[index].success).toBe(element.success);
    });

    const unauthorized = await request(app)
      .get(`/api/v1/insights/student/top-user/${teamsMock[1].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/student/top-user/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });
});
