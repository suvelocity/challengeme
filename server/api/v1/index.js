const { Router } = require("express");

const router = Router();

router.use("/challenges", require("./challenges"));

module.exports = router;
