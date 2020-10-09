const { Router } = require('express');
const axios = require('axios');
const filterResults = require('./middleware/filterResults');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const { Label } = require('../../models');

const labelRouter = Router();

labelRouter.get('/', async (req, res) => {
  try {
      const allLabels = await Label.findAll({});
      res.json(allLabels)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})




// challengeRouter.get("/:challengeId", async (req, res) => {
//   try {
//     const challenge = await Challenge.findOne({
//       where: { id: req.params.challengeId },
//       include: [Label]
//     });
//     res.json(challenge);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


module.exports = labelRouter;