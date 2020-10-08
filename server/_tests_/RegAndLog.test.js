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
  test("User Can Register", async (done) => {
    const registerResponse = await request(server)
      .post("/api/v1/auth/register")
      .send(mockUser.reg);
    expect(registerResponse.status).toBe(201);

    done();
  });

  test("Cannot register if User Name is not unique", async (done) => {
    const registerResponse = await request(server)
      .post("/api/v1/auth/register")
      .send(mockUser.reg);
    expect(registerResponse.status).toBe(201);

    const invalidRegisterResponse = await request(server)
      .post("/api/v1/auth/register")
      .send(mockUser.reg);
    expect(invalidRegisterResponse.status).toBe(409);

    done();
  });

  // user login
  test("User Can Login", async (done) => {
    const registerResponse = await request(server)
      .post("/api/v1/auth/register")
      .send(mockUser.reg);
    expect(registerResponse.status).toBe(201);

    const invalidLoginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send({ userName: "supposed", password: "toFail" });
    expect(invalidLoginResponse.status).toBe(404);

    const loginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send(mockUser.login);
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.accessToken.length > 0).toBe(true);
    expect(loginResponse.body.refreshToken.length > 0).toBe(true);
    expect(loginResponse.body.userDetails.userName).toBe(
      mockUser.login.userName
    );

    done();
  });

  // user logout
  test("User Can Logout", async (done) => {
    const registerResponse = await request(server)
      .post("/api/v1/auth/register")
      .send(mockUser.reg);
    expect(registerResponse.status).toBe(201);

    const loginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send(mockUser.login);
    expect(loginResponse.status).toBe(200);

    const logOutResponse = await request(server)
      .post("/api/v1/auth/logout")
      .send({ token: loginResponse.body.refreshToken });
    expect(logOutResponse.status).toBe(200);

    done();
  });
  
});
