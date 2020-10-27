const { User } = require("../models");

module.exports = function checkAdmin(req, res, next) {
  console.error(req.user);
  User.findOne({
    where: { userName: req.user.userName },
  }).then((user) => {
    if (user.permission === "admin") {
      next();
    } else {
      res.status(400).json({ message: "UnAuthorized" });
    }
  });
};
