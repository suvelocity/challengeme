const { Router } = require("express");

const router = Router();

router.use('/challenges', require('./challenges'));
router.use('/images', require('./images'));
// router.use("/reviews", require("./reviews"));

module.exports = router;
