const reviewsRouter = require("express").Router();
const { Challenge } = require("../../models");

// review mock for easy sevelopment
const review = {
  id: 32123,
  title: "love that challenge!!!",
  content:
    "i had a graceful time to review this challenge and i had a lot of feedback but eventually bla bla bla",
  createdAt: new Date(),
  rating: 3,
};

reviewsRouter.get("/byChallenge/:challengeId", async (req, res) => {
  // get array of reviews for this challenge , include user object (id, firstName,lastName, githubAccount)in the response
  try {
    res.send("reviews!!!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
reviewsRouter.get("/byUser/:challengeId", async (req, res) => {
  // get array of reviews for this user , include challenge name and id for each review object in the response
  try {
    res.send("reviews!!!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
reviewsRouter.post("/:challengeId", async (req, res) => {
  // get array of reviews for this challenge , include user object in the response
  try {
    res.send("reviews!!!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = reviewsRouter;
