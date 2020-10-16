const { Router } = require("express");
const router = Router();
const { User } = require("../../models");

router.get("/:userName", async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        userName: req.params.userName,
      },
      attributes: [
        "firstName",
        "lastName",
        "birthDate",
        "country",
        "city",
        "githubAccount",
        "createdAt",
      ],
    });
    res.json(user);
  } catch {
    res.status(400).json({ message: "Cannot process request" });
  }
});
module.exports = router;
