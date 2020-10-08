const { Router } = require('express');
const { Submission } = require('../../models');
const router = Router();

/* {
    solutionRepo: 'TheAlmightyCrumb/calculator-challenge-Submission7', // first part Solution Repository after it Submission Id
    success: false // true or false
} */
// getting id from the SolutionRepositry
/* const string1 = 'Submission';
const index = data.jobs[0].name.lastIndexOf(string1);
const stringLength = string1.length;//index === -1 ? string2.length : string1.length;
const submissionId = data.jobs[0].name.slice(index+stringLength); */

router.post('/', (req, res) => {
    console.error(req.body);
    res.json('success');
})

module.exports = router;