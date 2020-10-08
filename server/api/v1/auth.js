require('dotenv').config()
const { Router } = require("express");
const usersRouter = Router();
const { User, RefreshToken } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//need to check if github

// register request
usersRouter.post("/register", async (req, res) => {
  // if user name already exist return error
  const checkUser = await User.findOne({
    where: {
      userName: req.body.userName,
    },
  });
  if (checkUser) return res.status(409).send("user name already exists");
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const hashAnswer = await bcrypt.hash(req.body.securityAnswer, 10);
  const newUser = {
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashPassword,
    email: req.body.email,
    birthDate: req.body.birthDate,
    country: req.body.country,
    city: req.body.city,
    phoneNumber: req.body.phoneNumber,
    githubAccount: req.body.githubAccount,
    reasonOfRegistration: req.body.reasonOfRegistration,
    securityQuestion: req.body.securityQuestion,
    securityAnswer: hashAnswer,
  };
  // create new user
  await User.create(newUser);
  res.status(201).json({ message: "Register Success" });
});

//Log In
usersRouter.post("/login", async (req, res) => {
  const currentUser = await userIsExist(req.body.userName);
  if (!currentUser)
    return res.status(404).json({ message: "Cannot Find User" });
  const validPass = await bcrypt.compare(
    req.body.password,
    currentUser.password
  );
  if (!validPass)
    return res.status(403).json({ message: "User or Password incorrect" });
  const expired = req.body.rememberMe ? "365 days" : "24h";
  const refreshToken = jwt.sign(currentUser, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: expired
  });
  const accessToken = generateToken(currentUser);
  await RefreshToken.create({
    userName: currentUser.userName,
    token: refreshToken,
  });
  const body = {
    remember: req.body.rememberMe,
    accessToken: accessToken,
    refreshToken: refreshToken,
    userDetails: currentUser,
  };
  res.status(200).json(body);
});

usersRouter.post("/token", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh Token Required" });
  const validRefreshToken = await RefreshToken.findOne({
    where: {
      token: refreshToken,
    },
  });
  if (!validRefreshToken)
    return res.status(403).json({ message: "Invalid Refresh Token" });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });
    delete decoded.iat;
    delete decoded.exp;
    const accessToken = generateToken(decoded);
    res.status(200).json({ token: accessToken });
  });
});

// Logout request
usersRouter.post("/logout", async (req, res) => {
  if (!req.body.token)
    return res.status(400).json({ message: "Refresh Token Required" });
  // check if token exist and delete it
  const result = await RefreshToken.destroy({
    where: {
      token: req.body.token,
    },
  });

  if (!result)
    return res.status(400).json({ message: "Refresh Token is required" });
  res.status(200).json({ message: "User Logged Out Successfully" });
});

// validate token
usersRouter.post("/info", checkToken, (req, res) => {
  res.status(200).json({ message: "success get sensitive info" });
});

//Geting Sequrity Question
usersRouter.post("/getquestion", async (req, res) => {
  const currentUser = await userIsExist(req.body.userName);
  if (!currentUser)
    return res.status(404).json({ message: "Cannot Find User" });
  res
    .status(200)
    .json({ securityQuestion: currentUser.securityQuestion });
});

//Validate Answer
usersRouter.post("/validateanswer", async (req, res) => {
  const currentUser = await userIsExist(req.body.userName);
  if (!currentUser)
    return res.status(404).json({ message: "Cannot Find User" });
  const validAnswer = await bcrypt.compare(
    req.body.securityAnswer,
    currentUser.securityAnswer
  );
  if (!validAnswer) return res.status(403).json({ message: "Wrong Answer" });
  const token = jwt.sign(currentUser, process.env.RESET_PASSWORD_TOKEN, { expiresIn: "300s" });
  res.json({ token });
});
//Password Update
usersRouter.put("/passwordupdate", async (req, res) => {
  jwt.verify(req.body.token, process.env.RESET_PASSWORD_TOKEN, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await User.update({ password: hashPassword }, {
      where: {
        userName: decoded.userName 
      }
    });
    res.status(200).json({ message: "Changed Password Sucsessfuly" });
});
});

async function userIsExist(userName) {
  const user = await User.findOne({
    where: {
      userName: userName,
    },
  });
  if (user) {
    return user.dataValues;
  } else {
    return user
  }

}

function checkToken(req, res, next) {
  let token = req.headers["authorization"];
  token = token && token.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Token Required" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Access Token" });
    req.user = decoded;
    next();
  });
}

function generateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

module.exports = usersRouter;
