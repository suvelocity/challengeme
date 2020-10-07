const { Router } = require('express');

const router = Router();

router.use('/challenges', require('./challenges'));
router.use('/image', require('./image'));

module.exports = router;
