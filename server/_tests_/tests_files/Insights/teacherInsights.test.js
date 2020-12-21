const request = require('supertest');
const app = require('../../../app');
const {
  User,
  UserTeam,
  Team,
  Submission,
  Challenge,
  Assignment,
} = require('../../../models');
const {
  generateToken,
  countSuccessSubmissionsPerChallenge,
  filterUsersByTeam,
  filterSubmissionsByTeam,
  countGroupArray,
  filterLastSubmissionsForTeacherRoute,
  combineSubmissionToChallenge,
  combineSubmissionToUserWithChallenge,
  filteredArrayByIds,
  countSuccessSubmissionsWithUserName,
  formatCreatedAtToMoment,
} = require('../../utils');
const {
  usersMock,
  teamsMock,
  usersTeamsMock,
  submissionsMock,
  challengesMock,
  assignmentsMock,
} = require('../../mocks');

describe('Testing teacher insights routes', () => {
  beforeAll(async () => {
    await UserTeam.destroy({ truncate: true, force: true });
    await Submission.destroy({ truncate: true, force: true });
    await Assignment.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
    await Team.destroy({ truncate: true, force: true });
    await Challenge.destroy({ truncate: true, force: true });

    await User.bulkCreate(usersMock);
    await Team.bulkCreate(teamsMock);
    await Challenge.bulkCreate(challengesMock);
    await Assignment.bulkCreate(assignmentsMock);
    await Submission.bulkCreate(submissionsMock);
    await UserTeam.bulkCreate(usersTeamsMock);
  });

  test('Teacher can get last submissions insights about his team', async (done) => {
    const teamSubmissionsInsightsOneChallenge = await request(app)
      .get(`/api/v1/insights/teacher/team-submissions/${teamsMock[0].id}`)
      .query({ challenge: challengesMock[0].id })
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    const filteredSubmissions = filterLastSubmissionsForTeacherRoute(
      teamsMock[0],
      [challengesMock[0].id],
      submissionsMock,
      usersTeamsMock,
    );

    expect(teamSubmissionsInsightsOneChallenge.status).toBe(200);
    expect(
      teamSubmissionsInsightsOneChallenge.body.hasOwnProperty('success'),
    ).toBe(true);
    expect(
      teamSubmissionsInsightsOneChallenge.body.hasOwnProperty('fail'),
    ).toBe(true);
    expect(
      teamSubmissionsInsightsOneChallenge.body.hasOwnProperty('notYet'),
    ).toBe(true);
    expect(teamSubmissionsInsightsOneChallenge.body.success).toBe(
      filteredSubmissions.success,
    );
    expect(teamSubmissionsInsightsOneChallenge.body.fail).toBe(
      filteredSubmissions.fail,
    );
    expect(teamSubmissionsInsightsOneChallenge.body.notYet).toBe(
      filteredSubmissions.notYet,
    );

    const teamSubmissionsInsightsAssignments = await request(app)
      .get(`/api/v1/insights/teacher/team-submissions/${teamsMock[0].id}`)
      .query({ challenge: 'assignments' })
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    const teamAssignments = assignmentsMock
      .map((assignment) => {
        if (assignment.teamId === teamsMock[0].id) {
          return assignment.challengeId;
        }
      })
      .filter((a) => !!a);

    const filteredAssignments = filterLastSubmissionsForTeacherRoute(
      teamsMock[0],
      teamAssignments,
      submissionsMock,
      usersTeamsMock,
    );

    expect(teamSubmissionsInsightsAssignments.status).toBe(200);
    expect(
      teamSubmissionsInsightsAssignments.body.hasOwnProperty('success'),
    ).toBe(true);
    expect(teamSubmissionsInsightsAssignments.body.hasOwnProperty('fail')).toBe(
      true,
    );
    expect(
      teamSubmissionsInsightsAssignments.body.hasOwnProperty('notYet'),
    ).toBe(true);
    expect(teamSubmissionsInsightsAssignments.body.success).toBe(
      filteredAssignments.success,
    );
    expect(teamSubmissionsInsightsAssignments.body.fail).toBe(
      filteredAssignments.fail,
    );
    expect(teamSubmissionsInsightsAssignments.body.notYet).toBe(
      filteredAssignments.notYet,
    );

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/team-submissions/${teamsMock[0].id}`)
      .query({ challenge: challengesMock[0].id })
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/team-submissions/${teamsMock[0].id}`)
      .query({ challenge: challengesMock[0].id })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

  test('Teacher can get the most success submitted challenges of his team', async (done) => {
    const teamSubmissionsInsightsOneChallenge = await request(app)
      .get(`/api/v1/insights/teacher/success-challenge/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(teamSubmissionsInsightsOneChallenge.status).toBe(200);
    expect(teamSubmissionsInsightsOneChallenge.body.length <= 5).toBe(true);
    teamSubmissionsInsightsOneChallenge.body.forEach((challenge) => {
      expect(challenge.hasOwnProperty('challengeSuccesses')).toBe(true);
      expect(challenge.hasOwnProperty('name')).toBe(true);
    });

    const teamUsersId = filterUsersByTeam(teamsMock[0], usersTeamsMock);
    const conditions = [
      {
        paramter: 'state',
        equal: 'SUCCESS',
      },
    ];
    const teamSubmissions = filterSubmissionsByTeam(
      submissionsMock,
      teamUsersId,
      conditions,
    );
    const filteredChallenges = countSuccessSubmissionsPerChallenge(
      teamSubmissions,
      challengesMock,
    );

    teamSubmissionsInsightsOneChallenge.body.forEach((element, index) => {
      expect(filteredChallenges[index].name).toBe(element.name);
      expect(filteredChallenges[index].challengeSuccesses).toBe(
        element.challengeSuccesses,
      );
    });

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/success-challenge/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/success-challenge/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

  test('Teacher can get the last week submissions of his team', async (done) => {
    const teamLastWeekSubmissions = await request(app)
      .get(`/api/v1/insights/teacher/last-week-submissions/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(teamLastWeekSubmissions.status).toBe(200);
    const teamUsersId = filterUsersByTeam(teamsMock[0], usersTeamsMock);
    const teamSubmissions = filterSubmissionsByTeam(
      submissionsMock,
      teamUsersId,
    );
    const OneWeek = 7 * 24 * 60 * 60 * 1000;
    const lastWeekSubmissions = teamSubmissions.filter(
      (submission) => submission.createdAt >= new Date(Date.now() - OneWeek),
    );

    const formattedMomentSubmissions = formatCreatedAtToMoment(lastWeekSubmissions);

    const groupSubmissions = countGroupArray(
      formattedMomentSubmissions,
      'dateSubmissions',
      'createdAt',
    );

    teamLastWeekSubmissions.body.forEach((element, index) => {
      expect(groupSubmissions[index].dateSubmissions).toBe(element.dateSubmissions);
      expect(groupSubmissions[index].createdAt).toBe(element.createdAt);
    });

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/last-week-submissions/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/last-week-submissions/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

  test('Teacher can get the challenges submissions per challenges of his team', async (done) => {
    const teamSubmissionsPerChallenges = await request(app)
      .get(
        `/api/v1/insights/teacher/challenges-submissions/${teamsMock[0].id}?onlyLast=false`,
      )
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(teamSubmissionsPerChallenges.status).toBe(200);

    const teamUsersId = filterUsersByTeam(teamsMock[0], usersTeamsMock);
    const teamSubmissions = filterSubmissionsByTeam(
      submissionsMock,
      teamUsersId,
    );
    const challengesWithCount = combineSubmissionToChallenge(
      challengesMock,
      teamSubmissions,
    );

    teamSubmissionsPerChallenges.body.forEach((challenge, index) => {
      expect(challengesWithCount[index].Submissions).toHaveLength(
        challenge.Submissions.length,
      );
    });

    const teamSubmissionsPerChallengesOnlyLast = await request(app)
      .get(
        `/api/v1/insights/teacher/challenges-submissions/${teamsMock[0].id}?onlyLast=true`,
      )
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(teamSubmissionsPerChallengesOnlyLast.status).toBe(200);

    const teamUsersIdOnlyLast = filterUsersByTeam(teamsMock[0], usersTeamsMock);
    const teamSubmissionsOnlyLast = filterSubmissionsByTeam(
      submissionsMock,
      teamUsersIdOnlyLast,
    );
    const challengesWithCountOnlyLast = combineSubmissionToChallenge(
      challengesMock,
      teamSubmissionsOnlyLast,
      'true',
    );

    teamSubmissionsPerChallengesOnlyLast.body.forEach((challenge, index) => {
      expect(challengesWithCountOnlyLast[index].Submissions).toHaveLength(
        challenge.Submissions.length,
      );
    });

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/challenges-submissions/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/challenges-submissions/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

  test('Teacher can get the challenges submissions per users of his team', async (done) => {
    const teamSubmissionsPerUsers = await request(app)
      .get(`/api/v1/insights/teacher/users-submissions/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(teamSubmissionsPerUsers.status).toBe(200);

    const teamUsersId = filterUsersByTeam(teamsMock[0], usersTeamsMock);
    const usersFromTeam = filteredArrayByIds(usersMock, teamUsersId);
    const usersFromTeamWithSubmissions = combineSubmissionToUserWithChallenge(
      usersFromTeam,
      submissionsMock,
      challengesMock,
    );

    teamSubmissionsPerUsers.body.forEach((user, index) => {
      expect(usersFromTeamWithSubmissions[index].userName).toBe(user.userName);
      expect(usersFromTeamWithSubmissions[index].Submissions).toHaveLength(
        user.Submissions.length,
      );
    });

    const teamSubmissionsPerUsersOnlyLast = await request(app)
      .get(
        `/api/v1/insights/teacher/users-submissions/${teamsMock[0].id}?onlyLast=true`,
      )
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    expect(teamSubmissionsPerUsersOnlyLast.status).toBe(200);

    const teamUsersIdOnlyLast = filterUsersByTeam(teamsMock[0], usersTeamsMock);
    const usersFromTeamOnlyLast = filteredArrayByIds(
      usersMock,
      teamUsersIdOnlyLast,
    );
    const usersFromTeamWithSubmissionsOnlyLast = combineSubmissionToUserWithChallenge(
      usersFromTeamOnlyLast,
      submissionsMock,
      challengesMock,
      'true',
    );

    teamSubmissionsPerUsersOnlyLast.body.forEach((user, index) => {
      expect(usersFromTeamWithSubmissionsOnlyLast[index].userName).toBe(
        user.userName,
      );
      expect(
        usersFromTeamWithSubmissionsOnlyLast[index].Submissions,
      ).toHaveLength(user.Submissions.length);
    });

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/users-submissions/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/users-submissions/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });

  test('Teacher can get the top users per success challenges of his team', async (done) => {
    const teamSubmissionsPerUsers = await request(app)
      .get(`/api/v1/insights/teacher/top-user/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[0])}`);

    const teamUsersId = filterUsersByTeam(teamsMock[0], usersTeamsMock);
    const usersFromTeam = filteredArrayByIds(usersMock, teamUsersId);
    const usersFromTeamWithSubmissions = combineSubmissionToUserWithChallenge(
      usersFromTeam,
      submissionsMock,
      challengesMock,
    );
    const formattedMembers = countSuccessSubmissionsWithUserName(usersFromTeamWithSubmissions);

    expect(teamSubmissionsPerUsers.status).toBe(200);
    formattedMembers.forEach((user, index) => {
      expect(teamSubmissionsPerUsers.body[index].userName).toBe(user.userName);
      expect(teamSubmissionsPerUsers.body[index].success).toBe(user.success);
      expect(teamSubmissionsPerUsers.body[index].fail).toBe(user.fail);
    });

    const unauthorized = await request(app)
      .get(`/api/v1/insights/teacher/top-user/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    const adminNotInTeam = await request(app)
      .get(`/api/v1/insights/teacher/top-user/${teamsMock[0].id}`)
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(adminNotInTeam.status).toBe(200);

    done();
  });
});
