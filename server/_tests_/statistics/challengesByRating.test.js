const request = require("supertest");
const app = require("../../app");

//model for bulkCreate
require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const { Submission, Challenge, User, Review } = require("../../models");
const challenges = require("./mocks/challenges");
const submissions = require("./mocks/submissions");
const users = require("./mocks/users");
const reviews = require("./mocks/reviews");


//mock data

describe("insights tests", () => {
    beforeAll(async () => {
        console.log("process.env.NODE_ENV", process.env.NODE_ENV);
        await Challenge.destroy({ truncate: true, force: true });
        await Submission.destroy({ truncate: true, force: true });
        await User.destroy({ truncate: true, force: true });
        await Review.destroy({ truncate: true, force: true });
        const challengesRes = await Challenge.bulkCreate(challenges);
        const submissionsRes = await Submission.bulkCreate(submissions);
        const userRes = await User.bulkCreate(users);
        const reviewRes = await Review.bulkCreate(reviews);
    });

    afterAll(async () => {
        app.close();
    });

    it('can get top 5 challenges by rating AVG', async () => {
        const { body } = await request.agent(app).get("/api/v1/statistics/insights/challenges-by-reviews").expect(200)
        expect(body.length).toBe(3)
        expect(body[0].ratingAVG[0]).toBe(4)
        expect(body[1].ratingAVG[3]).toBe(2)
        expect(body[0].id).toBe(challenges[0].id)
        expect(body[2].type).toBe(challenges[2].id)
    })

});
