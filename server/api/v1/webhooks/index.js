const router = require('express').Router();
const checkAdmin = require('../../../middleware/checkAdmin');
const checkToken = require('../../../middleware/checkToken');
const checkWebhook = require('../../../middleware/checkWebhook');

router.use('/submissions', checkToken, require('./githubResponses'));
router.use('/teams', checkWebhook, require('./teams'));
router.use('/events', checkWebhook, require('./events'));
router.use('/admin', checkToken, checkAdmin, require('./admin'));
router.use('/trigger-events', checkToken, require('./triggerEvents'));

module.exports = router;
