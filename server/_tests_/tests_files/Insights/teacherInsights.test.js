const request = require('supertest');
const app = require('../../../app');
const moment = require('moment');
const {
  generateToken,
  countSuccessAndFailSubmissionsPerChallenge,
  countSuccessSubmissionsPerChallenge,
  filterUsersByTeam,
  filterSubmissionsByTeam,
  countGroupArray,
  filterLastSubmissionsForTeacherRoute
} = require('../../Functions');
const { User, UserTeam, Team, Submission, Challenge, Assignment } = require('../../../models');
const userMock = require('../../mocks/users');
const userTeamMock = require('../../mocks/usersTeams');
const teamMock = require('../../mocks/teams');
const submissionsMock = require('../../mocks/submissions');
const challengesMock = require('../../mocks/challenges');
const assignmentMock = require('../../mocks/assignments');

describe('Testing teacher insights routes', () => {
  beforeEach(async () => {
    await User.destroy({ truncate: true, force: true });
    await UserTeam.destroy({ truncate: true, force: true });
    await Team.destroy({ truncate: true, force: true });
    await Submission.destroy({ truncate: true, force: true });
    await Challenge.destroy({ truncate: true, force: true });
    await Assignment.destroy({ truncate: true, force: true });
  });

  test('Teacher can get last submissions insights about his team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);
    await Submission.bulkCreate(submissionsMock);
    await Challenge.bulkCreate(challengesMock);
    await Assignment.bulkCreate(assignmentMock);

    const teamSubmissionsInsightsOneChallenge = await request(app)
      .get(`/api/v1/insights/teacher/team-submissions/${teamMock[0].id}`)
      .query({ challenge: challengesMock[0].id })
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    const filteredSubmissions = filterLastSubmissionsForTeacherRoute(teamMock[0], [challengesMock[0].id], submissionsMock, userTeamMock);

    expect(teamSubmissionsInsightsOneChallenge.status).toBe(200);
    expect(teamSubmissionsInsightsOneChallenge.body.hasOwnProperty('success')).toBe(true);
    expect(teamSubmissionsInsightsOneChallenge.body.hasOwnProperty('fail')).toBe(true);
    expect(teamSubmissionsInsightsOneChallenge.body.hasOwnProperty('notYet')).toBe(true);
    expect(teamSubmissionsInsightsOneChallenge.body.success).toBe(filteredSubmissions.success);
    expect(teamSubmissionsInsightsOneChallenge.body.fail).toBe(filteredSubmissions.fail);
    expect(teamSubmissionsInsightsOneChallenge.body.notYet).toBe(filteredSubmissions.notYet);

    const teamSubmissionsInsightsAssignments = await request(app)
      .get(`/api/v1/insights/teacher/team-submissions/${teamMock[0].id}`)
      .query({ challenge: 'assignments' })
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    const teamAssignments = assignmentMock.map(assignment => {
      if (assignment.teamId === teamMock[0].id) {
        return assignment.challengeId
      }
    }).filter(a => !(!a));

    const filteredAssignments = filterLastSubmissionsForTeacherRoute(teamMock[0], teamAssignments, submissionsMock, userTeamMock);

    expect(teamSubmissionsInsightsAssignments.status).toBe(200);
    expect(teamSubmissionsInsightsAssignments.body.hasOwnProperty('success')).toBe(true);
    expect(teamSubmissionsInsightsAssignments.body.hasOwnProperty('fail')).toBe(true);
    expect(teamSubmissionsInsightsAssignments.body.hasOwnProperty('notYet')).toBe(true);
    expect(teamSubmissionsInsightsAssignments.body.success).toBe(filteredAssignments.success);
    expect(teamSubmissionsInsightsAssignments.body.fail).toBe(filteredAssignments.fail);
    expect(teamSubmissionsInsightsAssignments.body.notYet).toBe(filteredAssignments.notYet);

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/team-submissions/${teamMock[0].id}`)
      .query({ challenge: challengesMock[0].id })
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/team-submissions/${teamMock[0].id}`)
      .query({ challenge: challengesMock[0].id })
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

  test('Teacher can get the most success submitted challenges of his team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);
    await Submission.bulkCreate(submissionsMock);
    await Challenge.bulkCreate(challengesMock);
    await Assignment.bulkCreate(assignmentMock);

    const teamSubmissionsInsightsOneChallenge = await request(app)
      .get(`/api/v1/insights/teacher/success-challenge/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamSubmissionsInsightsOneChallenge.status).toBe(200);
    expect(teamSubmissionsInsightsOneChallenge.body.length <= 5).toBe(true);
    teamSubmissionsInsightsOneChallenge.body.forEach(challenge => {
      expect(challenge.hasOwnProperty('challengeSuccesses')).toBe(true)
      expect(challenge.hasOwnProperty('name')).toBe(true)
    })

    const teamUsersId = filterUsersByTeam(teamMock[0], userTeamMock);
    const conditions = [
      {
        paramter: 'state',
        equal: 'SUCCESS'
      }]
    const teamSubmissions = filterSubmissionsByTeam(teamUsersId, conditions)
    const filteredChallenges = countSuccessSubmissionsPerChallenge(teamSubmissions, challengesMock)
    const groupedChallenges = countGroupArray(filteredChallenges, 'challengeSuccesses', 'name')
    const filteredOrderedGrouped = groupedChallenges.sort((a, b) => b.challengeSuccesses - a.challengeSuccesses).splice(0, 5);
    filteredOrderedGrouped.forEach((element, index) => {
      expect(teamSubmissionsInsightsOneChallenge.body[index].name).toBe(element.name);
      expect(teamSubmissionsInsightsOneChallenge.body[index].challengeSuccesses).toBe(element.challengeSuccesses);
    })

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/success-challenge/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/success-challenge/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

  test('Teacher can get the last week submissions of his team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);
    await Submission.bulkCreate(submissionsMock);
    await Challenge.bulkCreate(challengesMock);
    await Assignment.bulkCreate(assignmentMock);

    const teamLastWeekSubmissions = await request(app)
      .get(`/api/v1/insights/teacher/last-week-submissions/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamLastWeekSubmissions.status).toBe(200);
    const teamUsersId = filterUsersByTeam(teamMock[0], userTeamMock);
    const teamSubmissions = filterSubmissionsByTeam(teamUsersId);
    const formattedSubmissions = teamSubmissions.map((submission) => {
      submission.createdAt = moment(submission.createdAt).fromNow()
      submission.createdAt = submission.createdAt.includes('hour') ? 'today' : submission.createdAt.includes('minutes') ? 'today' : submission.createdAt.includes('seconds') ? 'today' : submission.createdAt
      return { dateSubmissions: 1, createdAt: submission.createdAt }
    })
    const groupSubmissions = countGroupArray(formattedSubmissions, 'dateSubmissions', 'createdAt')
    groupSubmissions.forEach((element, index) => {
      expect(teamLastWeekSubmissions.body[index].dateSubmissions).toBe(element.dateSubmissions);
      expect(teamLastWeekSubmissions.body[index].createdAt).toBe(element.createdAt);
    })

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/last-week-submissions/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/last-week-submissions/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

  test('Teacher can get the challenges submissions per challenges of his team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);
    await Submission.bulkCreate(submissionsMock);
    await Challenge.bulkCreate(challengesMock);
    await Assignment.bulkCreate(assignmentMock);

    const teamSubmissionsPerChallenges = await request(app)
      .get(`/api/v1/insights/teacher/challenges-submissions/${teamMock[0].id}?onlyLast=false`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    const teamUsersId = filterUsersByTeam(teamMock[0], userTeamMock);
    const filteredSubmissionsByTeam = submissionsMock.filter(submission => teamUsersId.includes(submission.userId)).sort((a, b) => b.createdAt - a.createdAt)
    const challengesWithCount = challengesMock.map(challenge => {
      challenge.Submissions = []
      filteredSubmissionsByTeam.forEach(submission => {
        if (challenge.id === submission.challengeId) {
          challenge.Submissions.push(submission)
        }
      })
      return challenge
    }).filter(challenge => challenge.count > 0).sort((a, b) => b.count - a.count)
    expect(teamSubmissionsPerChallenges.status).toBe(200);

    challengesWithCount.forEach((element, index) => {
      expect(teamSubmissionsPerChallenges.body[index].name).toBe(element.name);
      expect(teamSubmissionsPerChallenges.body[index].Submissions.length).toBe(element.Submissions.length);
      expect(teamSubmissionsPerChallenges.body[index].Submissions[0].id).toBe(element.Submissions[0].id);
    })

    const teamSubmissionsPerChallenges2 = await request(app)
      .get(`/api/v1/insights/teacher/challenges-submissions/${teamMock[0].id}?onlyLast=true`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamSubmissionsPerChallenges.status).toBe(200);

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/challenges-submissions/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/challenges-submissions/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

  test('Teacher can get the challenges submissions per users of his team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);
    await Submission.bulkCreate(submissionsMock);
    await Challenge.bulkCreate(challengesMock);
    await Assignment.bulkCreate(assignmentMock);

    const teamSubmissionsPerUsers = await request(app)
      .get(`/api/v1/insights/teacher/users-submissions/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamSubmissionsPerUsers.status).toBe(200);

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/users-submissions/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/users-submissions/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

  test('Teacher can get the top users per success challenges of his team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);
    await Submission.bulkCreate(submissionsMock);
    await Challenge.bulkCreate(challengesMock);
    await Assignment.bulkCreate(assignmentMock);

    const teamSubmissionsPerUsers = await request(app)
      .get(`/api/v1/insights/teacher/top-user/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamSubmissionsPerUsers.status).toBe(200);

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/top-user/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/top-user/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });
});


