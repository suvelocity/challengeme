const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const { User, UserTeam, Team, Submission, Challenge, Assignment } = require('../../../models');
const userMock = require('../../mocks/users');
const userTeamMock = require('../../mocks/usersTeams');
const teamMock = require('../../mocks/teams');
const submissionsMock = require('../../mocks/submissions');
const challengesMock = require('../../mocks/challenges');
const assignmentMock = require('../../mocks/assignments');

function generateToken(currentUser) {
  const infoForCookie = {
    userId: currentUser.id,
    userName: currentUser.userName,
  };
  return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '900s',
  });
}

const filterLastSubmissionPerChallenge = (submissionsOrderedByDate) => {
  const filteredAlready = [];
  let success = 0;
  let fail = 0;
  submissionsOrderedByDate.forEach((submission) => {
    if (filteredAlready.some(filteredSubmission =>
      filteredSubmission.userId === submission.userId &&
      filteredSubmission.challengeId === submission.challengeId)) {
    } else {
      filteredAlready.push({ userId: submission.userId, challengeId: submission.challengeId });
      if (submission.state === 'SUCCESS') {
        success++
      } else {
        fail++
      }
    }
  })
  return { success, fail }
}

function filterUsersByTeam(team) {
  return userTeamMock.map(userTeam => {
    if (userTeam.teamId === team.id && userTeam.permission === 'student') {
      return userTeam.userId;
    }
  }).filter(a => !(!a));
}

function filterSuccessSubmissionsByTeam(teamIdArray) {
  return submissionsMock.map(submission => {
    if (submission.state === 'SUCCESS' && teamIdArray.includes(submission.userId)) {
      return submission;
    }
  }).filter(a => !(!a));
}


function filterLastSubmissionsForTeacherRoute(team, challengeIdArray) {
  const teamUsersId = filterUsersByTeam(team)
  const totalSubmissionsShouldBe = teamUsersId.length * challengeIdArray.length;

  const totalSubmissionsOrderedByDate = submissionsMock.map((submission) => {
    if (teamUsersId.includes(submission.userId) && challengeIdArray.includes(submission.challengeId)) {
      return submission;
    }
  }).filter(a => !(!a)).sort((a, b) => b.createdAt - a.createdAt);

  const filteredSubmissions = filterLastSubmissionPerChallenge(totalSubmissionsOrderedByDate);
  const notYetSubmitted = (teamUsersId.length * totalSubmissionsShouldBe) - (filteredSubmissions.success + filteredSubmissions.fail);
  filteredSubmissions.notYet = notYetSubmitted ? notYetSubmitted : 0;
  return filteredSubmissions;
}

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

    const filteredSubmissions = filterLastSubmissionsForTeacherRoute(teamMock[0], [challengesMock[0].id]);

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

    const filteredAssignments = filterLastSubmissionsForTeacherRoute(teamMock[0], teamAssignments);

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

  test.only('Teacher can get the most success submitted challenges of his team', async (done) => {
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

    const userChallengeArr = [];
    
    
    const teamUsersId = filterUsersByTeam(teamMock[0]);
    const teamSubmissions = filterSuccessSubmissionsByTeam(teamUsersId);
  
    console.log(teamSubmissions)

    /*
        [
          { name: 'Promise Implementation', challengeSuccesses: 2 },
          { name: 'React - 4 In A Row', challengeSuccesses: 1 },
          { name: 'React - Tv shows', challengeSuccesses: 1 },
          { name: 'React - Chat app', challengeSuccesses: 1 }
        ]
    */

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

  test.skip('Teacher can get the last week submissions of his team', async (done) => {
    await User.bulkCreate(userMock);
    await UserTeam.bulkCreate(userTeamMock);
    await Team.bulkCreate(teamMock);
    await Submission.bulkCreate(submissionsMock);
    await Challenge.bulkCreate(challengesMock);
    await Assignment.bulkCreate(assignmentMock);

    const teamSubmissionsInsightsOneChallenge = await request(app)
      .get(`/api/v1/insights/teacher/last-week-submissions/${teamMock[0].id}`)
      .set('authorization', `bearer ${generateToken(userMock[0])}`);

    expect(teamSubmissionsInsightsOneChallenge.status).toBe(200);
    console.log(teamSubmissionsInsightsOneChallenge.body);
    // expect(teamSubmissionsInsightsOneChallenge.body.length <= 5).toBe(true);
    // teamSubmissionsInsightsOneChallenge.body.forEach(challenge => {
    //   expect(challenge.hasOwnProperty('challengeSuccesses')).toBe(true)
    //   expect(challenge.hasOwnProperty('challengeId')).toBe(true)
    //   expect(challenge.hasOwnProperty('Challenge')).toBe(true)
    //   expect(challenge.Challenge.hasOwnProperty('name')).toBe(true)
    // })

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

});


