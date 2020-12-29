const labelRouter = require('express').Router();
const checkToken = require('../../middleware/checkToken');
const { LabelChallenge, Label } = require('../../models');

// get all labels option
labelRouter.get('/', async (req, res) => {
  try {
    const allLabels = await Label.findAll({ attributes: ['id', 'name'] });
    return res.json(allLabels);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

// add labels to challenge
labelRouter.post('/:challengeId', checkToken, async (req, res) => {
  const { challengeId } = req.params;
  const { labels: labelsArray } = req.body;
  if (labelsArray.length > 0) {
    try {
      await LabelChallenge.bulkCreate(
        labelsArray.map((label) => ({
          labelId: label.value,
          challengeId,
        })),
      );
      return res.json({ message: 'labels created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Cannot process request' });
    }
  } else {
    return res.status(400).json({ message: 'No labels chosen' });
  }
});

module.exports = labelRouter;
