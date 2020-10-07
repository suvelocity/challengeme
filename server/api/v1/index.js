const { Router } = require('express');

const router = Router();

router.use('/challenges', require('./challenges'));
router.use('/submissions', require('./submissions'));

module.exports = router;
