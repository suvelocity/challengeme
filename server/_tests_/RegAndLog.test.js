require('dotenv').config()
const request = require("supertest");
const server = require("../app");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, RefreshToken } = require("../models");

const mockUser = require("./mocks/users");
//login logout and register tests

describe("Register & Login Tests", () => {
  beforeAll(async () => {
    await User.destroy({ truncate: true, force: true }); 
    mockUser.user.password = await bcrypt.hash(mockUser.user.password, 10);
    await User.create(mockUser.user);
   
  })
  afterAll(async () => {
    await server.close();
  });

  // user register
  test("User Can Register if the userName Unique", async (done) => {
    const registerResponse = await request(server)
      .post("/api/v1/auth/register")
      .send(mockUser.reg);
    expect(registerResponse.body.message).toBe("Email Invalid");
    
    const regToken = jwt.sign(mockUser.reg, process.env.EMAIL_TOKEN_SECRET);

    const createUserResponse = await request(server)
      .post("/api/v1/auth/createuser")
      .send({token: regToken});
    expect(createUserResponse.status).toBe(201);

    const invalidRegisterResponse = await request(server)
      .post("/api/v1/auth/register")
      .send(mockUser.reg);
    expect(invalidRegisterResponse.status).toBe(409);

    done();
  });

  // user login
  test("User Can Login With Correct Details", async (done) => {

    const invalidLoginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send({ userName: "supposed", password: "toFail", rememberMe: "true"});
    expect(invalidLoginResponse.status).toBe(404);

    const loginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send(mockUser.login);
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.headers['set-cookie'][0].slice(0, 11)).toBe('accessToken');
    expect(loginResponse.headers['set-cookie'][1].slice(0, 12)).toBe('refreshToken');
    const refreshTokenInDB = loginResponse.headers['set-cookie'][1].split('=')[1].split(';')[0];
    const validRefreshTokenInDB = await RefreshToken.findOne({
      where: {
        token: refreshTokenInDB
      }
    })
    expect(validRefreshTokenInDB.userName).toBe(mockUser.login.userName)
    expect(loginResponse.body.userDetails.userName).toBe(
      mockUser.login.userName
    );

    done();
  });

  // user logout
  test("User Can Logout", async (done) => {

    const loginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send(mockUser.login);
    expect(loginResponse.status).toBe(200);

    const refreshToken = loginResponse.headers['set-cookie'][1].split('=')[1].split(';')[0];
    console.log(refreshToken)

    const logOutResponse = await request(server)
      .post("/api/v1/auth/logout")
      .send({ token: refreshToken });
    expect(logOutResponse.status).toBe(200);

    done();
  });

});
