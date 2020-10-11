const request = require("supertest");
const app = require("../../app");

//model for bulkCreate
require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const { Submission, Challenge, User, Teams, UsersTeams } = require("../../models");
const challenges = require("./mocks/challenges");
const submissions = require("./mocks/submissions");
const users = require("./mocks/users");
const teams = require("./mocks/teams");
const usersTeams = require("./mocks/usersTeams");

//mock data

describe("teams tests", () => {
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

    });

    afterAll(async () => {
        app.close();
    });

    it('can get teams with most succssesfull submissions', async () => {
        const { body } = await request(app).get('/api/v1/statistics/teams/top').expect(200)
        expect(body.length).toBe(3)
        expect(body[0]['Users.Submissions.teamSuccessSubmissions']).toBe(2)
        expect(body[2]['Users.Submissions.teamSuccessSubmissions']).toBe(1)
    })
    it('can get team users successes', async () => {
        const { body } = await request(app).get('/api/v1/statistics/teams/top-user').expect(200)
        expect(body.length).toBe(1)
        expect(body[0]['firstName']).toBe(users[0].firstName)
        expect(body[0]['Submissions.userSuccessSubmission']).toBe(2)
    })
    it('can get the team last week submissions group by date', async () => {
        const { body } = await request(app).get('/api/v1/statistics/teams/last-week-submissions').expect(200)
        expect(body.length).toBe(2)
        expect(body[0]['createdAt'] > body[1]['createdAt']).toBe(true)
        expect(body[0]['dateSubmissions']).toBe(1)
        expect(body[1]['dateSubmissions']).toBe(1)
    })
    it('can get the team submissions by state', async () => {
        const { body } = await request(app).get('/api/v1/statistics/teams/team-submissions').expect(200)
        // expect(body.length).toBe(2)
        // expect(body[0]['createdAt'] > body[1]['createdAt']).toBe(true)
        // expect(body[0]['dateSubmissions']).toBe(1)
        // expect(body[1]['dateSubmissions']).toBe(1)
    })
    it('can get and count the successes challenges of the team', async () => {
        const { body } = await request(app).get('/api/v1/statistics/teams/success-challenge').expect(200)
        // expect(body.length).toBe(2)
        // expect(body[0]['createdAt'] > body[1]['createdAt']).toBe(true)
        // expect(body[0]['dateSubmissions']).toBe(1)
        // expect(body[1]['dateSubmissions']).toBe(1)
    })

})