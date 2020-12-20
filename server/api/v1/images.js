const imagRouter = require('express').Router();
const checkToken = require('../../middleware/checkToken');
const { Image } = require('../../models');

// get image per challenge by query
imagRouter.get('/', async (req, res) => {
  const challengeId = req.query.id;
  try {
    const image = await Image.findOne({
      where: { challengeId },
    });
    return res.json(image);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// add image for challenge
imagRouter.post('/', checkToken, async (req, res) => {
  const image = req.body;
  try {
    const checkIfExists = await Image.findOne({
      where: { challengeId: image.challengeId },
    });

    if (!checkIfExists) {
      await Image.create(image);
      return res.sendStatus(201);
    }
    return res.status(400).send('This challenge already have an image');
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = imagRouter;
