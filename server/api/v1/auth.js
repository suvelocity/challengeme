const { Router } = require("express");
const usersRouter = Router();
const { User, RefreshToken } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

ACCESS_TOKEN_SECRET = "MATAN";
REFRESH_TOKEN_SECRET = "ITAI";

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
  req.body.password = hashPassword;
  // create new user
  await User.create(req.body);
  res.status(201).json({ message: "Register Success" });
});

usersRouter.post("/login", async (req, res) => {
  const currentUser = await User.findOne({
    where: {
      userName: req.body.userName,
    },
  });
  if (!currentUser)
    return res.status(404).json({ message: "Cannot Find User" });
  const validPass = await bcrypt.compare(
    req.body.password,
    currentUser.password
  );
  if (!validPass)
    return res.status(403).json({ message: "User or Password incorrect" });
  const refreshToken = jwt.sign(currentUser.dataValues, REFRESH_TOKEN_SECRET);
  const accessToken = generateToken(currentUser.dataValues);
  await RefreshToken.create({
    userName: currentUser.userName,
    token: refreshToken,
  });
  const body = {
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
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });
    console.log(decoded);
    delete decoded.iat;
    const accessToken = generateToken(decoded);
    res.json({ token: accessToken });
  });
});

// logout request
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
  console.log(req.decoded);
  res.json({ message: "success get sensitive info" });
});

function checkToken(req, res, next) {
  const token = req.headers["authorization"];
  // const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Access Token Required" });
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Access Token" });
    req.decoded = decoded;
    next();
  });
}

function generateToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

module.exports = usersRouter;
