const { Router } = require('express');

const router = Router();

router.use('/challenges', require('./challenges'));
router.use('/webhook', require('./webhook'));

module.exports = router;
