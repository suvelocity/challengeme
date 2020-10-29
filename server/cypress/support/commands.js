const jwt = require('jsonwebtoken')

Cypress.Commands.add("generateToken", (currentUser) => {
  const infoForCookie = {
    userId: currentUser.id,
    userName: currentUser.userName,
  };
  return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "900s",
  });
});
