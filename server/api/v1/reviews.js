const reviewsRouter = require('express').Router();
const checkAdmin = require('../../middleware/checkAdmin');
const { Challenge, Review, User } = require('../../models');

reviewsRouter.get('/byChallenge/:challengeId', async (req, res) => {
  try {
    const { challengeId } = req.params;
    const reviews = await Review.findAll({
      where: { challengeId },
      include: {
        model: User,
        attributes: ['userName'],
      },
    });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

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
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

reviewsRouter.post('/:challengeId', async (req, res) => {
  const { title, content, rating } = req.body;
  const { userId } = req.user;
  const query = {
    title,
    content,
    rating,
    userId,
    challengeId: req.params.challengeId,
  };
  try {
    await Review.create(query);
    res.json({ message: 'Uploaded new review!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

//= ============================= Admin Routes ======================================

reviewsRouter.delete('/:reviewId', checkAdmin, async (req, res) => {
  const { reviewId } = req.params
  try {
    await Review.destroy({
      where: {
        id: reviewId
      }
    });
    res.sendStatus(204)
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = reviewsRouter;
