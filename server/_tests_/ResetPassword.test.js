const request = require("supertest");
const server = require("../app");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const mockUser = require("./mocks/users");
const mockLogins = require("./mocks/usersLogin");
const originalAnswer = mockUser[2].securityAnswer

describe("Reset Password", () => {
  beforeAll(async () => {
    await User.destroy({ truncate: true, force: true });
    mockUser[2].password = await bcrypt.hash(mockUser[2].password, 10);
    mockUser[2].securityAnswer = await bcrypt.hash(mockUser[2].securityAnswer, 10);
    await User.create(mockUser[2]);
  })
  afterAll(async () => {
    await server.close();
  });

  test("User Can Reset Password", async (done) => {

    const questionResponse = await request(server)
      .post("/api/v1/auth/getquestion")
      .send({ userName: mockUser[2].userName });
    expect(questionResponse.status).toBe(200);
    expect(questionResponse.body.securityQuestion).toBe(mockUser[2].securityQuestion);

    const answerRequest = {
      securityAnswer: originalAnswer,
      userName: mockUser[2].userName
    }

    const answerResponse = await request(server)
      .post("/api/v1/auth/validateanswer")
      .send(answerRequest);
    expect(answerResponse.status).toBe(200);
    expect(answerResponse.body.resetToken.length > 0);

    const newPasswordRequest = {
      resetToken: answerResponse.body.resetToken,
      password: "87654321"
    }

    const newPasswordResponse = await request(server)
      .patch("/api/v1/auth/passwordupdate")
      .send(newPasswordRequest);
    expect(newPasswordResponse.status).toBe(200);

    const loginAfterChangedPasswordRequest = {
      userName: mockUser[2].userName,
      password: "87654321",
      rememberMe: true
    }

    const loginAfterChangedPasswordRes = await request(server)
      .post("/api/v1/auth/login")
      .send(loginAfterChangedPasswordRequest);
    expect(loginAfterChangedPasswordRes.status).toBe(200);

    const oldPasswordLoginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send(mockLogins[2]);
    expect(oldPasswordLoginResponse.status).toBe(403);

    done();
  });

});