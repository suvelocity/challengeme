const router = require('express').Router();

router.use('/submissions', require('./submissions'));
router.use('/users', require('./users'));
router.use('/teams', require('./teams'));

module.exports = router;
