const { Router } = require("express");

const router = Router();

router.use('/challenges', require('./challenges'));
router.use('/image', require('./image'));
router.use('/new-challenge', require('./newChallenge'));
router.use('/webhook', require('./webhook'));
router.use('/statistics', require('./statisticsRoutes'));
router.use("/auth", require("./auth"));


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use(unknownEndpoint);


module.exports = router;
