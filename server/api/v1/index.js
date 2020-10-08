const { Router } = require("express");

const router = Router();

router.use('/auth', require('./auth'))
router.use('/challenges', require('./challenges'));


module.exports = router;
