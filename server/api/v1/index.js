const { Router } = require("express");

const router = Router();

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use('/challenges', require('./challenges'));
router.use('/image', require('./image'));
// router.use('/new-challenge', require('./newChallenge')); this does not exist, seems to be accounted for in challenges
router.use('/webhook', require('./webhook'));
router.use('/statistics', require('./statisticsRoutes'));
router.use("/auth", require("./auth"));
router.use('/labels', require('./labels'));
router.use(unknownEndpoint);

module.exports = router;
