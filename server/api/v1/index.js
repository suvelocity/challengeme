const { Router } = require('express');

const router = Router();

router.use('/challenges', require('./challenges'));
router.use('/new-challenge', require('./newChallenge'));

module.exports = router;
