const { Router } = require("express");

const router = Router();

router.use("/auth", require("./auth"));

router.use("/challenges", require("./challenges"));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use(unknownEndpoint);


module.exports = router;
