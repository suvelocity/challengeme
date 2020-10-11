const { Router } = require('express');

const router = Router();

router.use('/challenges', require('./challenges'));
router.use('/image', require('./image'));
router.use('/new-challenge', require('./newChallenge'));
router.use('/webhook', require('./webhook'));
router.use('/statistics', require('./statisticsRoutes'));

module.exports = router;
