const { Router } = require('express');
const router = Router();

router.post('/', (req, res) => {
    console.error(req.body);
    res.json('success');
})

module.exports = router;