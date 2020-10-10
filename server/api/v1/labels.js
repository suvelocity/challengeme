const { Router } = require('express');
const filterResults = require('../../middleware/filterResults');
const { Sequelize } = require('sequelize');

const { Label } = require('../../models');

const router = Router();

router.get('/',filterResults, async (req, res) => { // returns all available labels
  const allLabels = await Label.findAll();
  res.json(allLabels.map(({id,name})=>{return{label:name,value:id}}))
})

module.exports = router;
