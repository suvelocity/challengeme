const request = require("supertest");
const app = require("../../app");

//model for bulkCreate
require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const { Submission, Challenge, User, Teams, UsersTeams } = require("../../models");
const challenges = require("../mocks/challenges");
const submissions = require("../mocks/submissions");
const users = require("../mocks/users");
const teams = require("../mocks/teams");
const usersTeams = require("../mocks/usersTeams");

//mock data

describe("insights tests", () => {
    beforeAll(async () => {
        console.log("process.env.NODE_ENV", process.env.NODE_ENV);
        await Challenge.destroy({ truncate: true, force: true });
        await Submission.destroy({ truncate: true, force: true });
        await User.destroy({ truncate: true, force: true });
        await Teams.destroy({ truncate: true, force: true });
        await UsersTeams.destroy({ truncate: true, force: true });
        const challengesRes = await Challenge.bulkCreate(challenges);
        expect(challengesRes.length).toBe(3);
        const submissionsRes = await Submission.bulkCreate(submissions);
        expect(submissionsRes.length).toBe(6);
        const userRes = await User.bulkCreate(users);
        expect(userRes.length).toBe(3);
        const teamsRes = await Teams.bulkCreate(teams);
        expect(teamsRes.length).toBe(3);
        const usersTeamsRes = await UsersTeams.bulkCreate(usersTeams);
        expect(usersTeamsRes.length).toBe(6);

        const loginResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({
        userName: "dekdekdek",
        password: "blabla96",
        rememberMe: false
      }); 

      console.log(loginResponse.headers)
      this.accessToken = `Bearer ${loginResponse.headers['set-cookie'][2].split('=')[1].split(';')[0]}`;

    });

    afterAll(async () => {
        app.close();
    });

    it('can get teams with most succssesfull submissions', async () => {
      const { body } = await request(app).get('/api/v1/statistics/teams/top')
      .set("authorization", this.accessToken)
      .expect(200)

      expect(body.length).toBe(3)
      expect(body[0].name).toBe("teamB")
      expect(body[0].Users[0].Submissions[0].teamSuccessSubmissions).toBe(3)
      expect(body[1].Users[0].Submissions[0].teamSuccessSubmissions).toBe(2)
      expect(body[2].Users[0].Submissions[0].teamSuccessSubmissions).toBe(1)
      expect(body[0].Users[0].Submissions[0].teamSuccessSubmissions > body[1].Users[0].Submissions[0].teamSuccessSubmissions && body[1].Users[0].Submissions[0].teamSuccessSubmissions > body[2].Users[0].Submissions[0].teamSuccessSubmissions).toBe(true)
  })
  it('can get team users successes', async () => {
      const { body  } = await request(app).get('/api/v1/statistics/teams/top-user')
      .set("authorization", this.accessToken)
      .expect(200)

      expect(body[0].length).toBe(1)
      expect(body[0][0]['userName']).toBe(users[0].userName)
      expect(body[0][0].Submissions[0].userSuccessSubmission).toBe(2)
  })
  it('can get the team last week submissions group by date', async () => {
      const { body } = await request(app).get('/api/v1/statistics/teams/last-week-submissions')
      .set("authorization", this.accessToken)
      .expect(200)

      expect(body.length).toBe(2)
      expect(body[0]['createdAt'] > body[1]['createdAt']).toBe(true)
      expect(body[0]['dateSubmissions']).toBe(1)
      expect(body[1]['dateSubmissions']).toBe(1)
  })
  it('can get the team submissions by state', async () => {
      const { body } = await request(app).get('/api/v1/statistics/teams/team-submissions')
      .set("authorization", this.accessToken)
      .expect(200)

      expect(body.all).toBe(body.success+body.fail+body.pending)
      expect(body.success).toBe(2)
      expect(body.fail).toBe(0)
      expect(body.pending).toBe(3)
  })
  it('can get and count the successes challenges of the team', async () => {
      const { body } = await request(app).get('/api/v1/statistics/teams/success-challenge')
      .set("authorization", this.accessToken)
      .expect(200)

      expect(body.length).toBe(2)
      expect(body[0].challengeSuccesses).toBe(1)
      expect(body[1].challengeSuccesses).toBe(1)
      expect(body[0].Challenge.name).toBe(challenges[0].name)
      expect(body[1].Challenge.name).toBe(challenges[1].name)
  })

})