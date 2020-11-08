const { Router } = require('express');
const { LabelChallenge, Label } = require('../../models');

const router = Router();

router.post('/', async (req, res) => { 
    try {
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Cannot process request' });
    }
});

router.get('/', async (req, res) => {
  try {
    
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = router;
