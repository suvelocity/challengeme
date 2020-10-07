const request = require("supertest");
const app = require("../app");

//model for bulkCreate
require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const { Submission, Challenge, User } = require("../models");
const challenges = require("./mocks/challenges");
const submissions = require("./mocks/submissions");
const users = require("./mocks/users");

//mock data

describe("get the all insights", () => {
    beforeAll(async () => {
      console.log("process.env.NODE_ENV", process.env.NODE_ENV);
      await Challenge.destroy({ truncate: true, force: true });
      await Submission.destroy({ truncate: true, force: true });
      await User.destroy({ truncate: true, force: true });
      const challengesRes = await Challenge.bulkCreate(challenges);
      expect(challengesRes.length).toBe(3);
      const submissionsRes = await Submission.bulkCreate(submissions);
      expect(submissionsRes.length).toBe(6);
      const userRes = await User.bulkCreate(users);
      console.log(userRes);
      expect(userRes.length).toBe(3);
    });
  
    afterAll(async () => {
      app.close();
    });
  
    it("can get all top-challenges by theirs submitting amount", async () => {
      const { body } = await request(app).get("/api/v1/statistics/insights/top-challenges").expect(200);
      expect(body.length).toBe(3)
      expect(body[0].Challenge.name).toBe(challenges[0].name)
      expect(body[1].Challenge.name).toBe(challenges[1].name)
      expect(body[2].Challenge.name).toBe(challenges[2].name)
    })
  });
  