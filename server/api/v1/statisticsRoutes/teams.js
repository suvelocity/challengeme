const { Router } = require('express');
const router = Router()
const { Submission, Challenge } = require('../../../models');


router.get('/', async (req, res) => {
    res.send('hello world teams')
  })

module.exports = router;