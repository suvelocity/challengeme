const request = require('supertest');
const app = require('../../../app');
const {
  User,
  Submission,
  Challenge,
} = require('../../../models');
const {
  generateToken,
  countSuccessSubmissionsPerChallenge,
  countGroupArray,
  combineSubmissionToChallenge,
  combineSubmissionToUserWithChallenge,
  filterLastSubmissionsForAdminRoute,
  countSuccessSubmissionsWithUserName,
  formatCreatedAtToMoment,
} = require('../../utils');
const {
  usersMock,
  submissionsMock,
  challengesMock,
} = require('../../mocks');

describe('Testing admin insights routes', () => {
  beforeAll(async () => {
    await User.destroy({ truncate: true, force: true });
    await Submission.destroy({ truncate: true, force: true });
    await Challenge.destroy({ truncate: true, force: true });

    await User.bulkCreate(usersMock);
    await Submission.bulkCreate(submissionsMock);
    await Challenge.bulkCreate(challengesMock);
  });

  test('Admin can get last submissions insights about all users', async (done) => {
    const allUSsersSubmissionsInsightsOneChallenge = await request(app)
      .get('/api/v1/insights/admin/all-submissions')
      .query({ challenge: challengesMock[0].id })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    const filteredSubmissions = filterLastSubmissionsForAdminRoute(
      [challengesMock[0].id],
      submissionsMock,
      usersMock,
    );

    expect(allUSsersSubmissionsInsightsOneChallenge.status).toBe(200);
    expect(
      allUSsersSubmissionsInsightsOneChallenge.body.hasOwnProperty('success'),
    ).toBe(true);
    expect(
      allUSsersSubmissionsInsightsOneChallenge.body.hasOwnProperty('fail'),
    ).toBe(true);
    expect(
      allUSsersSubmissionsInsightsOneChallenge.body.hasOwnProperty('notYet'),
    ).toBe(true);
    expect(allUSsersSubmissionsInsightsOneChallenge.body.success).toBe(
      filteredSubmissions.success,
    );
    expect(allUSsersSubmissionsInsightsOneChallenge.body.fail).toBe(
      filteredSubmissions.fail,
    );
    expect(allUSsersSubmissionsInsightsOneChallenge.body.notYet).toBe(
      filteredSubmissions.notYet,
    );

    const allUsersSubmissionsInsightsAssignments = await request(app)
      .get('/api/v1/insights/admin/all-submissions')
      .query({ challenge: 'all' })
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    const challengesId = challengesMock.map((challenge) => challenge.id);

    const filteredAssignments = filterLastSubmissionsForAdminRoute(
      challengesId,
      submissionsMock,
      usersMock,
    );

    expect(allUsersSubmissionsInsightsAssignments.status).toBe(200);
    expect(
      allUsersSubmissionsInsightsAssignments.body.hasOwnProperty('success'),
    ).toBe(true);
    expect(allUsersSubmissionsInsightsAssignments.body.hasOwnProperty('fail')).toBe(
      true,
    );
    expect(
      allUsersSubmissionsInsightsAssignments.body.hasOwnProperty('notYet'),
    ).toBe(true);
    expect(allUsersSubmissionsInsightsAssignments.body.success).toBe(
      filteredAssignments.success,
    );
    expect(allUsersSubmissionsInsightsAssignments.body.fail).toBe(
      filteredAssignments.fail,
    );
    expect(allUsersSubmissionsInsightsAssignments.body.notYet).toBe(
      filteredAssignments.notYet,
    );

    const unauthorized = await request(app)
      .get('/api/v1/insights/admin/all-submissions')
      .query({ challenge: challengesMock[0].id })
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Admin can get the most success submitted challenges of all users', async (done) => {
    const adminSubmissionsInsightsOneChallenge = await request(app)
      .get('/api/v1/insights/admin/success-challenge')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(adminSubmissionsInsightsOneChallenge.status).toBe(200);
    expect(adminSubmissionsInsightsOneChallenge.body.length <= 5).toBe(true);
    adminSubmissionsInsightsOneChallenge.body.forEach((challenge) => {
      expect(challenge.hasOwnProperty('challengeSuccesses')).toBe(true);
      expect(challenge.hasOwnProperty('name')).toBe(true);
    });

    const allUsersSubmissionsOrdered = submissionsMock
      .filter((submission) => submission.state === 'SUCCESS')
      .sort((a, b) => b.createdAt - a.createdAt);

    const filteredChallenges = countSuccessSubmissionsPerChallenge(
      allUsersSubmissionsOrdered,
      challengesMock,
    ).slice(0, 5);

    filteredChallenges.forEach((element, index) => {
      expect(
        adminSubmissionsInsightsOneChallenge.body[index].challengeSuccesses,
      ).toBe(element.challengeSuccesses);
    });

    const unauthorized = await request(app)
      .get('/api/v1/insights/admin/success-challenge')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Admin can get the last week submissions of all users', async (done) => {
    const allUsersLastWeekSubmissions = await request(app)
      .get('/api/v1/insights/admin/last-week-submissions')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allUsersLastWeekSubmissions.status).toBe(200);

    const allUsersSubmissionsOrdered = submissionsMock.sort((a, b) => b.createdAt - a.createdAt);

    const formattedSubmissions = formatCreatedAtToMoment(allUsersSubmissionsOrdered);

    const groupSubmissions = countGroupArray(
      formattedSubmissions,
      'dateSubmissions',
      'createdAt',
    ).sort((a, b) => b.dateSubmissions - a.dateSubmissions);

    allUsersLastWeekSubmissions.body.forEach((element, index) => {
      expect(groupSubmissions[index].dateSubmissions).toBe(element.dateSubmissions);
      expect(groupSubmissions[index].createdAt).toBe(element.createdAt);
    });

    const unauthorized = await request(app)
      .get('/api/v1/insights/admin/last-week-submissions')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Admin can get the challenges submissions per challenges of all users', async (done) => {
    const allUsersSubmissionsPerChallenges = await request(app)
      .get('/api/v1/insights/admin/challenges-submissions?onlyLast=false')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    const challengesWithCount = combineSubmissionToChallenge(
      challengesMock,
      submissionsMock,
    );

    expect(allUsersSubmissionsPerChallenges.status).toBe(200);
    allUsersSubmissionsPerChallenges.body.forEach((challenge, index) => {
      expect(challengesWithCount[index].Submissions).toHaveLength(
        challenge.Submissions.length,
      );
    });

    const allUsersSubmissionsPerChallengesOnlyLast = await request(app)
      .get('/api/v1/insights/admin/challenges-submissions?onlyLast=true')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allUsersSubmissionsPerChallengesOnlyLast.status).toBe(200);

    const challengesWithCountOnlyLast = combineSubmissionToChallenge(
      challengesMock,
      submissionsMock,
      'true',
    );

    challengesWithCountOnlyLast.forEach((challenge, index) => {
      expect(
        allUsersSubmissionsPerChallengesOnlyLast.body[index].Submissions,
      ).toHaveLength(challenge.Submissions.length);
    });

    const unauthorized = await request(app)
      .get('/api/v1/insights/admin/challenges-submissions')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Admin can get the challenges submissions per users of all users', async (done) => {
    const allUsersSubmissionsPerUsers = await request(app)
      .get('/api/v1/insights/admin/users-submissions')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allUsersSubmissionsPerUsers.status).toBe(200);

    const usersWithSubmissions = combineSubmissionToUserWithChallenge(
      usersMock,
      submissionsMock,
      challengesMock,
    );

    allUsersSubmissionsPerUsers.body.forEach((user, index) => {
      expect(user.Submissions).toHaveLength(usersWithSubmissions[index].Submissions.length);
    });

    const allUsersSubmissionsPerUsersOnlyLast = await request(app)
      .get('/api/v1/insights/admin/users-submissions?onlyLast=true')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    const allUsersWithSubmissionsOnlyLast = combineSubmissionToUserWithChallenge(
      usersMock,
      submissionsMock,
      challengesMock,
      'true',
    );

    expect(allUsersSubmissionsPerUsersOnlyLast.status).toBe(200);
    allUsersSubmissionsPerUsersOnlyLast.body.forEach((user, index) => {
      expect(user.Submissions).toHaveLength(allUsersWithSubmissionsOnlyLast[index].Submissions.length);
    });

    const unauthorized = await request(app)
      .get('/api/v1/insights/admin/users-submissions')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test('Admin can get the top users per success challenges of all users', async (done) => {
    const allUsersSubmissionsPerUsers = await request(app)
      .get('/api/v1/insights/admin/top-user')
      .set('authorization', `bearer ${generateToken(usersMock[2])}`);

    expect(allUsersSubmissionsPerUsers.status).toBe(200);

    const usersWithSubmissions = combineSubmissionToUserWithChallenge(usersMock, submissionsMock, challengesMock);
    const formattedMembers = countSuccessSubmissionsWithUserName(usersWithSubmissions);

    allUsersSubmissionsPerUsers.body.forEach((user, index) => {
      expect(formattedMembers[index].userName).toBe(user.userName);
      expect(formattedMembers[index].success).toBe(user.success);
      expect(formattedMembers[index].fail).toBe(user.fail);
    });

    const unauthorized = await request(app)
      .get('/api/v1/insights/admin/top-user')
      .set('authorization', `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });
});
