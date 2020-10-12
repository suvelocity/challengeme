const request = require("supertest");
const app = require("../../app");

//model for bulkCreate
require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const { Submission, Challenge, User, Review } = require("../../models");
const challenges = require("../mocks/challenges");
const submissions = require("../mocks/submissions");
const users = require("../mocks/users");
const reviews = require("../mocks/reviews");


//mock data

describe("insights tests", () => {
  beforeAll(async () => {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);

    await Challenge.destroy({ truncate: true, force: true });
    await Submission.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
    await Review.destroy({ truncate: true, force: true });

    const challengesRes = await Challenge.bulkCreate(challenges);
    expect(challengesRes.length).toBe(3);
    const submissionsRes = await Submission.bulkCreate(submissions);
    expect(submissionsRes.length).toBe(6);
    const userRes = await User.bulkCreate(users);
    expect(userRes.length).toBe(3);
    const reviewRes = await Review.bulkCreate(reviews);
    expect(reviewRes.length).toBe(7);

    const loginResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({
        userName: "dekdekdek",
        password: "blabla96",
        rememberMe: false
      }); 

      this.accessToken = `Bearer ${loginResponse.headers['set-cookie'][2].split('=')[1].split(';')[0]}`;

  });

  afterAll(async () => {
    app.close();
  });


  it("can get all top-challenges by theirs submitting amount", async () => {

      
    const { body } = await request(app).get("/api/v1/statistics/insights/top-challenges")
    .set("authorization", this.accessToken)
    .expect(200)
    ;
    expect(body.length).toBe(3)
    expect(body[0].Challenge.name).toBe(challenges[0].name)
    expect(body[1].Challenge.name).toBe(challenges[1].name)
    expect(body[2].Challenge.name).toBe(challenges[2].name)
  })

  it("can get all top-challenges that has the most amount of success submissions", async () => {
    const { body } = await request(app).get("/api/v1/statistics/insights/top-success")
    .set("authorization", this.accessToken)
    .expect(200);

    expect(body.length).toBe(2)
    expect(body[0].countSub).toBe(2)
    expect(body[0].Challenge.name).toBe(challenges[0].name)
    expect(body[1].Challenge.name).toBe(challenges[1].name)
  })

  it("can get all challenges group by type", async () => {
    const { body } = await request(app).get("/api/v1/statistics/insights/challenges-type")
    .set("authorization", this.accessToken)
    .expect(200);

    expect(body.length).toBe(2)
    expect(body[0].countType).toBe(2)
    expect(body[1].countType).toBe(1)
    expect(body[0].type).toBe(challenges[0].type && challenges[2].type)
    expect(body[1].type).toBe(challenges[1].type)
  })

  it('can get all submitions from the last 5 days', async () => {
    const { body } = await request(app).get("/api/v1/statistics/insights/sub-by-date")
    .set("authorization", this.accessToken)
    .expect(200)

    expect(body.length).toBe(3)
    expect(body[0].countByDay).toBe(2)
    expect(body[1].countByDay).toBe(1)
    expect(new Date(body[0].createdAt).getTime()).toBeGreaterThan(Date.now() - 432000000)
    expect(new Date(body[2].createdAt).getTime()).toBeGreaterThan(Date.now() - 432000000)
  })

  it('can get top 5 challenges by rating AVG', async () => {
    const { body } = await request(app).get("/api/v1/statistics/insights/challenges-by-reviews")
    .set("authorization", this.accessToken)
    .expect(200)

    expect(body.length).toBe(3)
    expect(body[0].ratingAVG).toBe(4.0000)
    expect(body[1].ratingAVG).toBe(2.6667)
    expect(body[0].Challenge.id).toBe(1)
    expect(body[2].Challenge.name).toBe(challenges[2].name)
  })

});
