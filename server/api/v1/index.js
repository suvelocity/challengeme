const { Router } = require("express");

const router = Router();

const checkToken = require('../../middleware/checkToken');


router.use("/auth", require("./auth"));

router.use('/challenges', checkToken, require('./challenges'));
router.use('/image', checkToken, require('./image'));
router.use('/webhook', checkToken, require('./webhook'));
router.use('/statistics', checkToken, require('./statisticsRoutes'));
router.use('/labels', checkToken, require('./labels'));
router.use('/reviews', checkToken, require('./reviews'));

// router.use('/new-challenge', require('./newChallenge')); this does not exist, seems to be accounted for in challenges

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use(unknownEndpoint);

module.exports = router;
