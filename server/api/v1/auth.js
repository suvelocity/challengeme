require('dotenv').config()
const { Router } = require("express");
const usersRouter = Router();
const { User, RefreshToken } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkToken = require('../../helpers/checkToken');
const mailer = require('../../helpers/communicator');

// Register 
usersRouter.post("/register", async (req, res) => {
  // if user name already exist return error
  const checkUser = await userIsExist(req.body.userName);

  if (checkUser) return res.status(409).send("user name already exists");
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const hashsecurityAnswer = await bcrypt.hash(req.body.securityAnswer, 10);
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
    securityAnswer: hashsecurityAnswer,
  };
  // send validation mail
  // await User.create(newUser);
  const mailedToken = jwt.sign(newUser, process.env.EMAIL_TOKEN_SECRET)
  mailer.sendHTMLMail(req.body.email, "Validate your E-mail", `<p>
  Conregulation Challenger, and welcome! You are now offically a part of challenge me
  community! To start challenging your friends and undertake challenges
  yourself, click on the buttom bellow.
</p>
<form action="http://localhost:3000/auth">
<input name="token" value="${mailedToken}" type="hidden">
  <button style="width: 200px; background-color: purple; color: white;">GET SHWIFFTY</button>
</form>`, (err, info) => {
    if (err) {
      res.status(400).json({ message: 'Email Invalid' })
    } else {
      res.json({ message: "Waiting For Mail Validation" })
    }
  });
});

// Create User
usersRouter.post('/createuser', (req, res) => {
  jwt.verify(req.body.token, process.env.EMAIL_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    delete decoded.iat;
    delete decoded.exp;
    await User.create(decoded);
    res.status(201).json({ message: "Register Success" });
  });
})

// Check if user exist
usersRouter.post("/userexist", async (req, res) => {
  const currentUser = await userIsExist(req.body.userName);
  if (currentUser) return res.status(409).json({ message: "user name already exists" });
  res.json({ notExist: true });
});

// Validate Token
usersRouter.get("/validateToken", checkToken, (req, res) => {
  res.json({ valid: true })
})

// Log In
usersRouter.post("/login", async (req, res) => {
  const currentUser = await userIsExist(req.body.userName);
  if (!currentUser)
    return res.status(404).json({ message: "User or Password incorrect" });
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

  res.cookie('accessToken', accessToken)
  res.cookie('refreshToken', refreshToken)
  res.json({userDetails: currentUser});
});

//Get new access token
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
    return res.status(401).json({ message: "Invalid Refresh Token" });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });
    delete decoded.iat;
    delete decoded.exp;
    const accessToken = generateToken(decoded);
    res.json({ token: accessToken });
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
  res.json({ message: "User Logged Out Successfully" });
});

// validate token
usersRouter.post("/info", checkToken, (req, res) => {
  res.json({ message: "success get sensitive info" });
});

// Geting Sequrity Question
usersRouter.post("/getquestion", async (req, res) => {
  const currentUser = await userIsExist(req.body.userName);
  if (!currentUser) return res.status(404).json({ message: "Cannot Find User" });
  res.json({ securityQuestion: currentUser.securityQuestion });
});

// Validate Answer
usersRouter.post("/validateanswer", async (req, res) => {
  const currentUser = await userIsExist(req.body.userName);
  if (!currentUser)
    return res.status(404).json({ message: "Cannot Find User" });
  const validAnswer = await bcrypt.compare(
    req.body.securityAnswer,
    currentUser.securityAnswer
  );
  if (!validAnswer) return res.status(403).json({ message: "Wrong Answer" });
  const resetToken = jwt.sign(currentUser, process.env.RESET_PASSWORD_TOKEN, { expiresIn: "300s" });
  res.json({ resetToken });
});

// Password Update
usersRouter.patch("/passwordupdate", async (req, res) => {
  const resetToken = req.body.resetToken;
  if (!resetToken) return res.status(400).json({ message: "Reset Token Required" });
  jwt.verify(resetToken, process.env.RESET_PASSWORD_TOKEN, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await User.update({ password: hashPassword }, {
      where: {
        userName: decoded.userName
      }
    });
    res.json({ message: "Changed Password Sucsessfuly" });
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

function generateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "900s" });
}

module.exports = usersRouter;
