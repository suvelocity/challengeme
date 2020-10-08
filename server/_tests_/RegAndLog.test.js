require('dotenv').config()
const request = require("supertest");
const server = require("../app");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
  test("User Can Register if the userName Unique", async (done) => {
    const registerResponse = await request(server)
      .post("/api/v1/auth/register")
      .send(mockUser.reg);
    expect(registerResponse.body.message).toBe("Waiting For Mail Validation");
    
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
  // test("User Can Login", async (done) => {
    
  //   const regToken = jwt.sign(mockUser.reg, process.env.EMAIL_TOKEN_SECRET);

  //   const createUserResponse = await request(server)
  //     .post("/api/v1/auth/createuser")
  //     .send({token: regToken});
  //   expect(createUserResponse.status).toBe(201);

  //   const invalidLoginResponse = await request(server)
  //     .post("/api/v1/auth/login")
  //     .send({ userName: "supposed", password: "toFail" });
  //   expect(invalidLoginResponse.status).toBe(404);

  //   const hashPassword = await bcrypt.hash(mockUser.reg.password, 10);

  //   const loginResponse = await request(server)
  //     .post("/api/v1/auth/login")
  //     .send({userName: "matanGreenvald", password: hashPassword, rememberMe: "false"});
  //   expect(loginResponse.status).toBe(200);
  //   expect(loginResponse.body.accessToken.length > 0).toBe(true);
  //   expect(loginResponse.body.refreshToken.length > 0).toBe(true);
  //   expect(loginResponse.body.userDetails.userName).toBe(
  //     mockUser.login.userName
  //   );

  //   done();
  // });

//   // user logout
//   test("User Can Logout", async (done) => {
//     const registerResponse = await request(server)
//       .post("/api/v1/auth/register")
//       .send(mockUser.reg);
//     expect(registerResponse.status).toBe(201);

//     const loginResponse = await request(server)
//       .post("/api/v1/auth/login")
//       .send(mockUser.login);
//     expect(loginResponse.status).toBe(200);

//     const logOutResponse = await request(server)
//       .post("/api/v1/auth/logout")
//       .send({ token: loginResponse.body.refreshToken });
//     expect(logOutResponse.status).toBe(200);

//     done();
//   });

});
