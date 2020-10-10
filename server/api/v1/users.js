const usersRouter = require("express").Router();
const { User, Challenge } = require("../../models");


usersRouter.get("/", async (req, res) => {
  // get array of reviews for this challenge , include user object (id, firstName,lastName, githubAccount)in the response
  try {
      const allUsers = await User.findAll();
      res.json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


module.exports = usersRouter;