const router = require('express').Router();

router.use('/access-key', require('./accessKey'));
router.use('/events', require('./events'));
router.use('/teams', require('./teams'));
router.use('/errors', require('./errors'));

module.exports = router;
