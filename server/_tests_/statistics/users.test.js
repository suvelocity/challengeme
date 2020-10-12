const request = require("supertest");
const app = require("../../app");

//model for bulkCreate
require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const { Submission, Challenge, User } = require("../../models");
const challenges = require("../mocks/challenges");
const submissions = require("../mocks/submissions");
const users = require("../mocks/users");

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

      const loginResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({
        userName: "boosty123",
        password: "boosty012",
        rememberMe: false
      }); 

      this.accessToken = `Bearer ${loginResponse.headers['set-cookie'][2].split('=')[1].split(';')[0]}`;
    });
  
    afterAll(async () => {
      app.close();
    });
  
    it("can get all top-users by theirs submitting amount", async () => {
      const { body } = await request(app).get("/api/v1/statistics/users/top-users")
      .set("authorization", this.accessToken)
      .expect(200);

      expect(body.length).toBe(2)
      expect(body[0].id).toBe(1)
      expect(body[0].User.userName).toBe(users[0].userName)
      expect(body[0].countSub).toBe(2)
      expect(body[1].id).toBe(3)
      expect(body[1].User.userName).toBe(users[2].userName)
      expect(body[1].countSub).toBe(1)
    })



    it("Can Get User Succeed Challenges", async () => {
    const { body } = await request(app).get("/api/v1/statistics/users/user-success")
    .set("authorization", this.accessToken)
    .expect(200);
  
    
    expect(body[0][0].id).toBe(3)
    expect(body[1]).toBe(users[2].userName)
    expect(body[0][0].state).toBe("SUCCESS")
    expect(body[0][0].CountByUserID).toBe(1)
    })
   
    it("Can Get The User Challenges Has Beend Done in the last 5 days", async () => {
    const { body } = await request(app).get("/api/v1/statistics/users/sub-by-date")
    .set("authorization", this.accessToken)
    .expect(200);
    
    expect(body[0].CountSubByDate).toBe(1)
    expect(new Date(body[0].createdAt).getTime()).toBeGreaterThan(Date.now() - 432000000)
    })
   
    it("can Sub Users By Type", async () => {
    const { body } = await request(app).get("/api/v1/statistics/users/sub-by-type")
    .set("authorization", this.accessToken)
    .expect(200);
  

    expect(body.length).toBe(1)
    expect(body[0].id).toBe(3)
    expect(body[0].userId).toBe(submissions[2].userId)
    expect(body[0].state).toBe("SUCCESS")
    expect(body[0].Challenge.id).toBe(1)
    expect(body[0].Challenge.type).toBe(challenges[0].type)
    })    

    it("can get User Unsolved Challenges", async () => {
    const { body } = await request(app).get("/api/v1/statistics/users/unsolved-challenges")
    .set("authorization", this.accessToken)
    .expect(200);

    expect(body.length).toBe(2)

    expect(body[0].name).toBe(challenges[1].name)
    expect(body[0].type).toBe(challenges[1].type)
    })
  });
  