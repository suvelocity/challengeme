const request = require("supertest");
const moment = require("moment");
const app = require("../../../app");
const {
  User,
  UserTeam,
  Team,
  Submission,
  Challenge,
  Assignment,
} = require("../../../models");
const {
  generateToken,
  countSuccessSubmissionsPerChallenge,
  filterUsersByTeam,
  filterSubmissionsByTeam,
  countGroupArray,
  countSuccessAndFailSubmissionsPerChallenge,
  filterLastSubmissionsForTeacherRoute,
  combineSubmissionToChallenge,
  combineSubmissionToUserWithChallenge,
  filteredArrayByIds,
} = require("../../Functions");
const {
  usersMock,
  teamsMock,
  usersTeamsMock,
  submissionsMock,
  challengesMock,
  assignmentsMock,
} = require("../../mocks");

function filterLastSubmissionsForAdminRoute(
  challengeIdArray,
  submissionsArray
) {
  const totalSubmissionsShouldBe = usersMock.length * challengeIdArray.length;

  const totalSubmissionsOrderedByDate = submissionsArray
    .map((submission) => {
      if (challengeIdArray.includes(submission.challengeId)) {
        return submission;
      }
    })
    .filter((a) => !!a)
    .sort((a, b) => b.createdAt - a.createdAt);

  const filteredSubmissions = countSuccessAndFailSubmissionsPerChallenge(
    totalSubmissionsOrderedByDate
  );
  const notYetSubmitted =
    totalSubmissionsShouldBe -
    (filteredSubmissions.success + filteredSubmissions.fail);
  filteredSubmissions.notYet = notYetSubmitted || 0;
  return filteredSubmissions;
}

describe("Testing admin insights routes", () => {
  beforeAll(async () => {
    await User.destroy({ truncate: true, force: true });
    await UserTeam.destroy({ truncate: true, force: true });
    await Team.destroy({ truncate: true, force: true });
    await Submission.destroy({ truncate: true, force: true });
    await Challenge.destroy({ truncate: true, force: true });
    await Assignment.destroy({ truncate: true, force: true });

    await User.bulkCreate(usersMock);
    await UserTeam.bulkCreate(usersTeamsMock);
    await Team.bulkCreate(teamsMock);
    await Submission.bulkCreate(submissionsMock);
    await Challenge.bulkCreate(challengesMock);
    await Assignment.bulkCreate(assignmentsMock);
  });

  test("Admin can get last submissions insights about all users", async (done) => {
    const teamSubmissionsInsightsOneChallenge = await request(app)
      .get("/api/v1/insights/admin/all-submissions")
      .query({ challenge: challengesMock[0].id })
      .set("authorization", `bearer ${generateToken(usersMock[2])}`);

    const filteredSubmissions = filterLastSubmissionsForAdminRoute(
      [challengesMock[0].id],
      submissionsMock
    );

    expect(teamSubmissionsInsightsOneChallenge.status).toBe(200);
    expect(
      teamSubmissionsInsightsOneChallenge.body.hasOwnProperty("success")
    ).toBe(true);
    expect(
      teamSubmissionsInsightsOneChallenge.body.hasOwnProperty("fail")
    ).toBe(true);
    expect(
      teamSubmissionsInsightsOneChallenge.body.hasOwnProperty("notYet")
    ).toBe(true);
    expect(teamSubmissionsInsightsOneChallenge.body.success).toBe(
      filteredSubmissions.success
    );
    expect(teamSubmissionsInsightsOneChallenge.body.fail).toBe(
      filteredSubmissions.fail
    );
    expect(teamSubmissionsInsightsOneChallenge.body.notYet).toBe(
      filteredSubmissions.notYet
    );

    const teamSubmissionsInsightsAssignments = await request(app)
      .get("/api/v1/insights/admin/all-submissions")
      .query({ challenge: "all" })
      .set("authorization", `bearer ${generateToken(usersMock[2])}`);

    const challengesId = challengesMock.map((challenge) => challenge.id);

    const filteredAssignments = filterLastSubmissionsForAdminRoute(
      challengesId,
      submissionsMock
    );

    expect(teamSubmissionsInsightsAssignments.status).toBe(200);
    expect(
      teamSubmissionsInsightsAssignments.body.hasOwnProperty("success")
    ).toBe(true);
    expect(teamSubmissionsInsightsAssignments.body.hasOwnProperty("fail")).toBe(
      true
    );
    expect(
      teamSubmissionsInsightsAssignments.body.hasOwnProperty("notYet")
    ).toBe(true);
    expect(teamSubmissionsInsightsAssignments.body.success).toBe(
      filteredAssignments.success
    );
    expect(teamSubmissionsInsightsAssignments.body.fail).toBe(
      filteredAssignments.fail
    );
    expect(teamSubmissionsInsightsAssignments.body.notYet).toBe(
      filteredAssignments.notYet
    );

    const unauthorized = await request(app)
      .get("/api/v1/insights/admin/all-submissions")
      .query({ challenge: challengesMock[0].id })
      .set("authorization", `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test("Admin can get the most success submitted challenges of all users", async (done) => {
    const adminSubmissionsInsightsOneChallenge = await request(app)
      .get("/api/v1/insights/admin/success-challenge")
      .set("authorization", `bearer ${generateToken(usersMock[2])}`);

    expect(adminSubmissionsInsightsOneChallenge.status).toBe(200);
    expect(adminSubmissionsInsightsOneChallenge.body.length <= 5).toBe(true);
    adminSubmissionsInsightsOneChallenge.body.forEach((challenge) => {
      expect(challenge.hasOwnProperty("challengeSuccesses")).toBe(true);
      expect(challenge.hasOwnProperty("name")).toBe(true);
    });

    const allUsersSubmissionsOrdered = submissionsMock
      .filter((submission) => submission.state === "SUCCESS")
      .sort((a, b) => b.createdAt - a.createdAt);

    const filteredChallenges = countSuccessSubmissionsPerChallenge(
      allUsersSubmissionsOrdered,
      challengesMock
    ).slice(0, 5);

    filteredChallenges.forEach((element, index) => {
      expect(
        adminSubmissionsInsightsOneChallenge.body[index].challengeSuccesses
      ).toBe(element.challengeSuccesses);
    });

    const unauthorized = await request(app)
      .get("/api/v1/insights/admin/success-challenge")
      .set("authorization", `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test("Admin can get the last week submissions of all users", async (done) => {
    const teamLastWeekSubmissions = await request(app)
      .get("/api/v1/insights/admin/last-week-submissions")
      .set("authorization", `bearer ${generateToken(usersMock[2])}`);

    expect(teamLastWeekSubmissions.status).toBe(200);

    const allUsersSubmissionsOrdered = submissionsMock.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    const formattedSubmissions = allUsersSubmissionsOrdered.map(
      (submission) => {
        let momentDate = moment(submission.createdAt).fromNow();
        momentDate = momentDate.includes("hour")
          ? "today"
          : momentDate.includes("minutes")
          ? "today"
          : momentDate.includes("seconds")
          ? "today"
          : momentDate;
        return { dateSubmissions: 1, createdAt: momentDate };
      }
    );
    const groupSubmissions = countGroupArray(
      formattedSubmissions,
      "dateSubmissions",
      "createdAt"
    ).sort((a, b) => b.dateSubmissions - a.dateSubmissions);

    teamLastWeekSubmissions.body.forEach((element, index) => {
      expect(groupSubmissions[index].dateSubmissions).toBe(
        element.dateSubmissions
      );
      expect(groupSubmissions[index].createdAt).toBe(element.createdAt);
    });

    const unauthorized = await request(app)
      .get("/api/v1/insights/admin/last-week-submissions")
      .set("authorization", `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test("Admin can get the challenges submissions per challenges of all users", async (done) => {
    const teamSubmissionsPerChallenges = await request(app)
      .get("/api/v1/insights/admin/challenges-submissions?onlyLast=false")
      .set("authorization", `bearer ${generateToken(usersMock[2])}`);

    const challengesWithCount = combineSubmissionToChallenge(
      challengesMock,
      submissionsMock
    );

    expect(teamSubmissionsPerChallenges.status).toBe(200);
    teamSubmissionsPerChallenges.body.forEach((challenge, index) => {
      expect(challengesWithCount[index].Submissions.length).toBe(
        challenge.Submissions.length
      );
    });

    const teamSubmissionsPerChallengesOnlyLast = await request(app)
      .get("/api/v1/insights/admin/challenges-submissions?onlyLast=true")
      .set("authorization", `bearer ${generateToken(usersMock[2])}`);

    expect(teamSubmissionsPerChallengesOnlyLast.status).toBe(200);

    const challengesWithCountOnlyLast = combineSubmissionToChallenge(
      challengesMock,
      submissionsMock,
      true
    );

    challengesWithCountOnlyLast.forEach((challenge, index) => {
      expect(
        teamSubmissionsPerChallengesOnlyLast.body[index].Submissions.length
      ).toBe(challenge.Submissions.length);
    });

    const unauthorized = await request(app)
      .get("/api/v1/insights/admin/challenges-submissions")
      .set("authorization", `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test("Admin can get the challenges submissions per users of all users", async (done) => {
    const teamSubmissionsPerUsers = await request(app)
      .get("/api/v1/insights/admin/users-submissions")
      .set("authorization", `bearer ${generateToken(usersMock[2])}`);

    expect(teamSubmissionsPerUsers.status).toBe(200);

    const usersFromTeamWithSubmissions = combineSubmissionToUserWithChallenge(
      usersMock,
      submissionsMock,
      challengesMock
    );

    teamSubmissionsPerUsers.body.forEach((user, index) => {
      expect(usersFromTeamWithSubmissions[index].Submissions.length).toBe(
        user.Submissions.length
      );
    });

    const teamSubmissionsPerUsersOnlyLast = await request(app)
      .get("/api/v1/insights/admin/users-submissions?onlyLast=true")
      .set("authorization", `bearer ${generateToken(usersMock[2])}`);

    const allUsersTeamWithSubmissionsOnlyLast = combineSubmissionToUserWithChallenge(
      usersMock,
      submissionsMock,
      challengesMock,
      true
    );

    expect(teamSubmissionsPerUsersOnlyLast.status).toBe(200);
    teamSubmissionsPerUsersOnlyLast.body.forEach((user, index) => {
      expect(
        allUsersTeamWithSubmissionsOnlyLast[index].Submissions.length
      ).toBe(user.Submissions.length);
    });

    const unauthorized = await request(app)
      .get("/api/v1/insights/admin/users-submissions")
      .set("authorization", `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });

  test("Admin can get the top users per success challenges of all users", async (done) => {
    const teamSubmissionsPerUsers = await request(app)
      .get("/api/v1/insights/admin/top-user")
      .set("authorization", `bearer ${generateToken(usersMock[2])}`);

    const usersWithSubmissions = usersMock
      .map((user) => {
        user.Submissions = [];
        submissionsMock.forEach((submission) => {
          if (
            submission.userId === user.id &&
            (submission.state === "FAIL" || submission.state === "SUCCESS")
          ) {
            user.Submissions.push(submission);
          }
        });
        user.Submissions.sort((a, b) => b.createdAt - a.createdAt);
        return user;
      })
      .sort((a, b) => b.Submissions[0].createdAt - a.Submissions[0].createdAt);

    expect(teamSubmissionsPerUsers.status).toBe(200);
    teamSubmissionsPerUsers.body.forEach((user, index) => {
      expect(usersWithSubmissions[index].userName).toBe(user.userName);
      expect(usersWithSubmissions[index].Submissions.length).toBe(
        user.Submissions.length
      );
    });

    const unauthorized = await request(app)
      .get("/api/v1/insights/admin/top-user")
      .set("authorization", `bearer ${generateToken(usersMock[1])}`);

    expect(unauthorized.status).toBe(401);

    done();
  });
});
