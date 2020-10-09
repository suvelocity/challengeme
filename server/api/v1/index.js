const { Router } = require('express');

const router = Router();

router.use('/challenges', require('./challenges'));
router.use('/image', require('./image'));
router.use('/labels', require('./labels'));
router.use('/new-challenge', require('./newChallenge'));

module.exports = router;
