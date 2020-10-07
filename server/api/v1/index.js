const { Router } = require('express');

const router = Router();

router.use('/users', require('./users'))
router.use('/challenges', require('./challenges'));

module.exports = router;
