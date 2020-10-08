const { Router } = require("express");

const router = Router();

router.use("/challenges", require("./challenges"));
router.use("/reviews", require("./reviews"));
router.use("/users", require("./users"));
module.exports = router;
