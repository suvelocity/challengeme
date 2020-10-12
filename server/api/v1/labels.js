const { Router } = require('express');
const { labelsToChallenge } = require('../../models');
const router = Router();

/*
  GET REQUEST FROM challenge.js
*/

router.post('/', async (req, res) => { // /api/v1/labels
  let challenge = req.body.challengeId;
  let labels = req.body.labels;
  if(labels.length > 0) {
    try {
      await labelsToChallenge.bulkCreate(
        labels.map(label => (
          {
            labelId: label,
            challengeId: challenge
          }
        ))
      );
      res.status(200).send('Success');
    } catch(error) { 
      res.status(400).send('Bad request');
    }
  } else {
    res.status(406).send('No labels chosen');
  }
});

module.exports = router;
