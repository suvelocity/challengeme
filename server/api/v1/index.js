const { Router } = require('express');

const router = Router();

router.use('/challenges', require('./challenges'));
router.use('/statistics', require('./statisticsRoutes'));

module.exports = router;
