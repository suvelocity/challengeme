const { Router } = require("express");
const checkToken = require("../../middleware/checkToken")
const router = Router();

router.use("/auth", require("./auth"));

router.use('/challenges', checkToken, require('./challenges'));
router.use('/image', checkToken, require('./image'));
router.use('/webhook', require('./webhook'));
router.use('/statistics', checkToken, require('./statisticsRoutes'));
router.use('/types',checkToken, require('./types'));
router.use('/labels', checkToken, require('./labels'));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use(unknownEndpoint);

module.exports = router;
