const { Router } = require('express');
const { Submission } = require('../../models');
const router = Router();

/* {
    solutionRepo: 'TheAlmightyCrumb/calculator-challenge-Submission7', // first part Solution Repository after it Submission Id
    success: false // true or false
} */

router.put('/submission/:id', (req, res) => {
    console.error(req.params.id);
    console.error(req.body);
    res.json('success');
})

module.exports = router;