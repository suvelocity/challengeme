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

    });

    afterAll(async () => {
        app.close();
    });

    it('can get teams with most succssesfull submitions', async () => {
        const { body } = await request(app).get('/api/v1/statistics/teams/top').expect(200)
        expect(body.length).toBe(3)
        expect(body[0]['Users.Submissions.teamSuccessSubmissions']).toBe(2)
        expect(body[2]['Users.Submissions.teamSuccessSubmissions']).toBe(1)
    })

})