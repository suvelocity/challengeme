const request = require("supertest");
const app = require("../../app");

//model for bulkCreate
require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const { Submission, Challenge, User } = require("../../models");
const challenges = require("./mocks/challenges");
const submissions = require("./mocks/submissions");
const users = require("./mocks/users");

//mock data

describe("insights tests", () => {
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

    it("can get all top-challenges that has the most amount of success submissions", async () => {
      const { body } = await request(app).get("/api/v1/statistics/insights/top-success").expect(200);
      expect(body.length).toBe(2)
      expect(body[0].countSub).toBe(2)
      expect(body[0].Challenge.name).toBe(challenges[0].name)
      expect(body[1].Challenge.name).toBe(challenges[1].name)
    })

    it("can get all challenges group by type", async () => {
      const { body } = await request(app).get("/api/v1/statistics/insights/challenges-type").expect(200);
      expect(body.length).toBe(2)
      expect(body[0].countType).toBe(2)
      expect(body[1].countType).toBe(1)
      expect(body[0].type).toBe(challenges[0].type && challenges[2].type)
      expect(body[1].type).toBe(challenges[1].type)
    })

  });
  