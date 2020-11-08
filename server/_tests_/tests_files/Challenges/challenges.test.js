const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../../app");
const { Challenge, Label, LabelChallenge, Submission, User, } = require("../../../models");
const labelsMocks = require("../../mocks/labels");
const challengesMock = require("../../mocks/challenges");
const usersMock = require("../../mocks/users");
const submissionsMock = require("../../mocks/submissions");

function generateToken(currentUser) {
  const infoForCookie = {
    userId: currentUser.id,
    userName: currentUser.userName,
  };
  return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "900s",
  });
}

describe("testing challenges endpoints", () => {
  beforeEach(async () => {
    await Challenge.destroy({ truncate: true, force: true });
    await Label.destroy({ truncate: true, force: true });
    await LabelChallenge.destroy({ truncate: true, force: true });
    await Submission.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
  });

  test("Can get all challenges approved", async (done) => {
    await Challenge.bulkCreate(challengesMock);
    const allChallenges = await request(app)
      .get("/api/v1/challenges")
      .set("authorization", `bearer ${generateToken(usersMock[0])}`);
    expect(allChallenges.status).toBe(200);
    expect(allChallenges.body.length).toBe(10);
    done();
  });

  test("Can get challenge by name", async (done) => {
    await Challenge.bulkCreate(challengesMock);
    const response = await request(app)
      .get("/api/v1/challenges?name=React - Calculator")
      .set("authorization", `bearer ${generateToken(usersMock[0])}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("React - Calculator");
    done();
  });

  test("Can get all github types", async (done) => {
    const response = await request(app)
      .get("/api/v1/types")
      .set("authorization", `bearer ${generateToken(usersMock[0])}`);
    expect(response.body.length).toBe(6);
    expect(response.status).toBe(200);
    done();
  });

  test("Can get all labels", async (done) => {
    await Label.bulkCreate(labelsMocks);
    const response = await request(app)
      .get("/api/v1/labels")
      .set("authorization", `bearer ${generateToken(usersMock[0])}`);
    expect(response.body.length).toBe(14);
    expect(response.status).toBe(200);
    done();
  });

  test("Can get submission per certain challenge for logged user ", async (done) => {
    await Challenge.bulkCreate(challengesMock);
    await User.bulkCreate(usersMock);
    await Submission.bulkCreate(submissionsMock);
    const response = await request(app)
      .get(`/api/v1/challenges/1/${usersMock[0].userName}/submission`)
      .set("authorization", `bearer ${generateToken(usersMock[0])}`);

    const submissionsFromDB = await Submission.findOne({
      where: {
        userId: usersMock[0].id,
        challengeId: 1
      }
    })

    expect(response.body.userId).toBe(submissionsFromDB.dataValues.userId);
    expect(response.body.state).toBe("SUCCESS");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(false);
    done();
  });

  test("Can post new challenge - send error if challenge's repo is already exists", async (done) => {

    const postNewChallenge = await request(app)
      .post('/api/v1/challenges')
      .send(challengesMock[0])
      .set('authorization', `bearer ${generateToken(usersMock[0])}`)

    expect(postNewChallenge.status).toBe(201);
    const response = await request(app)
      .get('/api/v1/challenges?challengeName=JWT - Node.js')
      .set('authorization', `bearer ${generateToken(usersMock[0])}`)

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);

    const newChallengeFromDB = await Challenge.findOne({
      where: {
        name: challengesMock[0].name
      }
    })

    expect(newChallengeFromDB.dataValues.name).toBe(challengesMock[0].name);

    const postNewChallengeAgain = await request(app)
      .post('/api/v1/challenges')
      .send(challengesMock[0])
      .set('authorization', `bearer ${generateToken(usersMock[0])}`)

    expect(postNewChallengeAgain.status).toBe(409);
    done()
  })
});