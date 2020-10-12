const { Router } = require("express");
const checkToken = require("../../middleware/checkToken")
const router = Router();

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use('/challenges',checkToken, require('./challenges'));
router.use('/image',checkToken, require('./image'));
router.use('/webhook',checkToken, require('./webhook'));
router.use('/statistics',checkToken, require('./statisticsRoutes'));
router.use("/auth", require("./auth"));
router.use('/labels',checkToken, require('./labels'));
router.use('/types',checkToken, require('./types'));

router.use(unknownEndpoint);

module.exports = router;
