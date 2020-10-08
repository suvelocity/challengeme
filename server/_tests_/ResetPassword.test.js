const request = require("supertest");
const server = require("../app");
const { User } = require("../models");

const mockUser = require("./mocks/users");

//login logout and register tests

describe("Register & Login Tests", () => {
  afterAll(async () => {
    await server.close();
  },
  beforeEach(async () => {
    await User.destroy({ truncate: true, force: true });
  }));

  // user register
  test("User Can Reset Password", async (done) => {
    const registerResponse = await request(server)
      .post("/api/v1/auth/register")
      .send(mockUser.reg);
    expect(registerResponse.status).toBe(201);

    const questionResponse = await request(server)
      .post("/api/v1/auth/getquestion")
      .send(mockUser.reg.userName);
    expect(questionResponse.securityQuestion).toBe(mockUser.reg.securityQuestion);

    const answerRequest = {
      securityAnswer : mockUser.reg.securityAnswer,
      userName : mockUser.reg.securityAnswer
    }
    const answerResponse = await request(server)
      .post("/api/v1/auth/validateanswer")
      .send(answerRequest);
    expect(answerResponse.token).toBe(!null);

    const newPasswordRequest = {
      token: answerResponse.token,
      password: "654321"
    }
    const newPasswordResponse = await request(server)
      .post("/api/v1/auth/passwordupdate")
      .send(newPasswordRequest);
    expect(newPasswordResponse.status).toBe(200);

    const loginAfterChangedPasswordRes = await request(server)
      .post("/api/v1/auth/login")
      .send({userName: mockUser.reg.userName, password:"654321"});
    expect(loginAfterChangedPasswordRes.status).toBe(200);

    const oldPasswordLoginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send({ userName: mockUser.reg.userName, password: mockUser.reg.password });
    expect(invalidLoginResponse.status).toBe(403);

    done();
  });
  
});