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
  
    it("can get all top-users by theirs submitting amount", async () => {
      const { body } = await request(app).get("/api/v1/statistics/users/top-users").expect(200);
    expect(body[0].countSub).toBe(3)
    expect(body[0].User.userName).toBe(users[0].userName)
    expect(body[1].countSub).toBe(2)
    expect(body[1].User.userName).toBe(users[1].userName)
    expect(body[2].countSub).toBe(1)
    expect(body[2].User.userName).toBe(users[2].userName)
    })


    // it("can get all top-users by theirs submitting amount", async () => {
    //   const { body } = await request(app).get("/api/v1/statistics/users/top-users").expect(200);
    // expect(body[0].countSub).toBe(3)
    // expect(body[0].User.userName).toBe(users[0].userName)
    // expect(body[1].countSub).toBe(2)
    // expect(body[1].User.userName).toBe(users[1].userName)
    // expect(body[2].countSub).toBe(1)
    // expect(body[2].User.userName).toBe(users[2].userName)
    // })
  });
  