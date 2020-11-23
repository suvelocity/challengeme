const router = require('express').Router();
const checkAdmin = require('../../../middleware/checkAdmin');

router.use('/admin', checkAdmin, require('./admin'));
router.use('/users', checkAdmin, require('./users'));
router.use('/teams', require('./teams'));

module.exports = router;
