const { Router } = require('express');
const { Submission } = require('../../models');

const router = Router();

router.patch('/submission/:id', async (req, res) => {
  try {
    const { success } = req.body;
    const { headers } = req;
    const submission = await Submission.findByPk(req.params.id);
    await submission.update({ state: success ? 'SUCCESS' : 'FAIL' });
    res.json(submission);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = router;
