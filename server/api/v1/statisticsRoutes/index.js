const { Router } = require('express');

const router = Router();

router.use('/users', require('./users'));
router.use('/teams', require('./teams'));
router.use('/insights', require('./insights'));


module.exports = router;
