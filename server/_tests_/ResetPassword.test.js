const request = require("supertest");
const server = require("../app");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const mockUser = require("./mocks/users");

describe("Register & Login Tests", () => {
  beforeAll(async () => {
    await User.destroy({ truncate: true, force: true }); 
    mockUser.user2.password = await bcrypt.hash(mockUser.user2.password, 10);
    mockUser.user2.securityAnswer= await bcrypt.hash(mockUser.user2.securityAnswer, 10);
    await User.create(mockUser.user2);
  })
  afterAll(async () => {
    await server.close();
  });

  test("User Can Reset Password", async (done) => {

    const questionResponse = await request(server)
      .post("/api/v1/auth/getquestion")
      .send({userName: mockUser.resetPassword.userName});
    expect(questionResponse.status).toBe(200);
    expect(questionResponse.body.securityQuestion).toBe(mockUser.user2.securityQuestion);

    const answerRequest = {
      securityAnswer : mockUser.resetPassword.securityAnswer,
      userName : mockUser.resetPassword.userName
    }

    const answerResponse = await request(server)
      .post("/api/v1/auth/validateanswer")
      .send(answerRequest);
    expect(answerResponse.status).toBe(200);
    expect(answerResponse.body.resetToken.length > 0);

    const newPasswordRequest = {
      resetToken: answerResponse.body.resetToken,
      password: "654321"
    }

    const newPasswordResponse = await request(server)
      .patch("/api/v1/auth/passwordupdate")
      .send(newPasswordRequest);
    expect(newPasswordResponse.status).toBe(200);

    const loginAfterChangedPasswordRequest = {
      userName: mockUser.resetPassword.userName, 
      password:"654321",
      rememberMe: "true"
    }

    const loginAfterChangedPasswordRes = await request(server)
      .post("/api/v1/auth/login")
      .send(loginAfterChangedPasswordRequest);
    expect(loginAfterChangedPasswordRes.status).toBe(200);

    const oldPasswordLoginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send(mockUser.resetPassword);
    expect(oldPasswordLoginResponse.status).toBe(403);

    done();
  });
  
});