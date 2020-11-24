const router = require('express').Router();
const checkAdmin = require('../../../middleware/checkAdmin');


router.use('/teacher', require('./teacher'));
router.use('/admin', checkAdmin, require('./admin'));

//===========Not in use==========================================//
router.use('/student', checkAdmin, require('./student'));
//===============================================================//



module.exports = router;
