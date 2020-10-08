const { Router } = require('express');

const router = Router();

router.use('/challenges', require('./challenges'));
router.use('/images', require('./images'));
module.exports = router;
