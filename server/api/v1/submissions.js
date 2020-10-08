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

router.post('/', async (req, res) => {
const { solutionRepo , success} = req.body;
console.log(solutionRepo.split('-Submission')[0])
  let submission = await Submission.findOne({
    where: {
      solutionRepository: solutionRepo.split('-Submission')[0]
    }
  });
  await submission.update({ state: success ? 'SUCCESS' : 'FAIL' })
    res.json(submission);
})





module.exports = router;