const { Router } = require("express");
const { LabelChallenge } = require("../../models");
const router = Router();

/*
  GET REQUEST FROM challenge.js
*/

router.post("/", async (req, res) => {
  // /api/v1/labels
  let { challengeId } = req.body;
  let { labels: labelsArray } = req.body;
  if (labels.length > 0) {
    try {
      await LabelChallenge.bulkCreate(
        labelsArray.map((label) => ({
          labelId: label,
          challengeId,
        }))
      );
      res.send(200).send("Success"); //TODO:  change sendStatus
    } catch (error) {
      res.status(400).send("Bad request");
    }
  } else {
    res.status(406).send("No labels chosen");
  }
});

module.exports = router;
