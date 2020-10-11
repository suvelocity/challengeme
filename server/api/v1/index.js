const { Router } = require("express");
const checkToken = require('../../helpers/checkToken');
const router = Router();

router.use('/challenges', checkToken, require('./challenges'));
router.use('/image', checkToken, require('./image'));
router.use('/new-challenge', checkToken, require('./newChallenge'));
router.use('/webhook', checkToken, require('./webhook'));
router.use('/statistics', checkToken, require('./statisticsRoutes'));
router.use("/auth", require("./auth"));


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use(unknownEndpoint);


module.exports = router;
