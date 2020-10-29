const { Router } = require('express');
const { LabelChallenge, Label } = require('../../models');

const router = Router();

router.post('/', async (req, res) => {
  const { challengeId } = req.body;
  const { labels: labelsArray } = req.body;
  if (labels.length > 0) {
    try {
      await LabelChallenge.bulkCreate(
        labelsArray.map((label) => ({
          labelId: label,
          challengeId,
        })),
      );
      res.json({ message: 'lables created successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Cannot process request' });
    }
  } else {
    res.status(400).json({ message: 'No labels chosen' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allLabels = await Label.findAll({ attributes: ['id', 'name'] });
    res.json(allLabels);
  } catch (error) {
    res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = router;
