const { Router } = require('express');
const { Submission } = require('../../models');
const router = Router();

/* {
    solutionRepo: 'TheAlmightyCrumb/calculator-challenge-Submission7', // first part Solution Repository after it Submission Id
    success: false // true or false
} */

router.put('/submission/:id', async (req, res) => {
    const { success } = req.body;
    let submission = await Submission.findByPk(req.params.id);
      await submission.update({ state: success ? 'SUCCESS' : 'FAIL' })
        res.json(submission);
})

module.exports = router;