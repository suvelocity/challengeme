const reviewsRouter = require('express').Router();
const { Challenge, Review, User } = require('../../models');

// review mock for easy sevelopment
const review = {
  id: 32123,
  title: 'love that challenge!!!',
  content:
    'i had a graceful time to review this challenge and i had a lot of feedback but eventually bla bla bla',
  createdAt: new Date(),
  rating: 3,
};

reviewsRouter.get('/byChallenge/:challengeId', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { challengeId: req.params.challengeId },
      include: {
        model: User,
        attributes: ['userName'],
      },
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Every challenge comes back with an average challenge
reviewsRouter.get(
  '/byChallenge/:challengeId/averageRating',
  async (req, res) => {
    try {
      const rating = await Review.findAll({
        where: { challengeId: req.params.challengeId },
        attributes: ['challengeId', 'rating'],
      });
      const averageRating = rating.map((item) => item.rating);
      res.json(averageRating.reduce((a, b) => a + b) / averageRating.length);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

reviewsRouter.get('/byUser/:challengeId/:userId', async (req, res) => {
  try {
    const { userId, challengeId } = req.params;
    const reviews = await Review.findAll({
      where: { userId, challengeId },
      include: {
        model: Challenge,
        attributes: ['name', 'id'],
      },
    });
    res.send(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

reviewsRouter.post('/:challengeId', async (req, res) => {
  const { title, content, rating, userId } = req.body;
  const query = {
    title,
    content,
    rating,
    userId,
    challengeId: req.params.challengeId,
  };
  try {
    await Review.create(query);
    res.status(200).send('Uploaded new review!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = reviewsRouter;
