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
    // const registerResponse = await request(server)
    //   .post("/api/v1/auth/register")
    //   .send(mockUser.reg);
    // expect(registerResponse.body.message).toBe("Email Invalid");
    
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
      .send({ userName: "supposed", password: "toFail", rememberMe: true});
    expect(invalidLoginResponse.status).toBe(403);

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


  test("User get new access token", async (done) => {

    const loginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send(mockUser.login);
    expect(loginResponse.status).toBe(200);

    const refreshToken = loginResponse.headers['set-cookie'][1].split('=')[1].split(';')[0];
    const accessToken = loginResponse.headers['set-cookie'][0].split('=')[1].split(';')[0];

    const validateToken = await request(server)
      .get("/api/v1/auth/validateToken")
      .set('authorization', `Bearer ${accessToken}`)
    expect(validateToken.status).toBe(200);

    const notValidateToken = await request(server)
      .get("/api/v1/auth/validateToken")
      .set('authorization', 'hkdfhaskjfhdsakjfhkdshfkds')
    expect(notValidateToken.status).toBe(408);

    const newAccessTokenRes = await request(server)
      .post("/api/v1/auth/token")
      .send({ token: refreshToken })
    expect(newAccessTokenRes.status).toBe(200);
    const newAccessToken = newAccessTokenRes.headers['set-cookie'][0].split('=')[1].split(';')[0];
    expect(newAccessToken.length > 0).toBe(true);
    done();
  });

  test("User exists", async (done) => {

    const userExist = await request(server)
      .post("/api/v1/auth/userexist")
      .send({userName: mockUser.reg.userName});
    expect(userExist.status).toBe(409);

    const userNotExist = await request(server)
      .post("/api/v1/auth/userexist")
      .send({userName: "Alibaba"});
    expect(userNotExist.status).toBe(200);

    done();
  });

  // user logout
  test("User Can Logout", async (done) => {

    const loginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send(mockUser.login);
    expect(loginResponse.status).toBe(200);

    const refreshToken = loginResponse.headers['set-cookie'][1].split('=')[1].split(';')[0];

    const logOutResponse = await request(server)
      .post("/api/v1/auth/logout")
      .send({ token: refreshToken });
    expect(logOutResponse.status).toBe(200);

    const deleteToken = await RefreshToken.findOne({
      where: {
        token: refreshToken
      }
    })

    expect(deleteToken).toBe(null);

    done();
  });




});
