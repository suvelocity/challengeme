const { Router } = require("express");
const { Image } = require("../../models");
const router = Router();

router.get("/", async (req, res) => {
  let challengeId = req.query.id;
  try {
    const image = await Image.findOne({
      where: { challengeId },
    });
    res.json(image);
  } catch (error) {
    res.status(400).json({ message: "Cannot process request" });
  }
});

router.post("/", async (req, res) => {
  let image = req.body;
  try {
    const checkIfExists = await Image.findOne({
      where: { challengeId: image.challengeId },
    });

    if (!checkIfExists) {
      const newImage = await Image.create(image);
      res.sendStatus(200);
    } else {
      res.status(400).send("This challenge already have an image");
    }
  } catch (error) {
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = router;
