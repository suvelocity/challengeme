const { Router } = require('express');
const checkToken = require('../../middleware/checkToken');
const checkAdmin = require('../../middleware/checkAdmin');

const router = Router();

router.use('/auth', require('./auth'));

router.use('/webhook', checkToken, require('./webhook'));
router.use('/challenges', checkToken, require('./challenges'));
router.use('/user_info', checkToken, require('./userInfo'));
router.use('/services', checkToken, require('./services'));
router.use('/image', checkToken, require('./image'));
router.use('/statistics', checkToken, require('./statisticsRoutes'));
router.use('/types', checkToken, require('./types'));
router.use('/labels', checkToken, require('./labels'));
router.use('/reviews', checkToken, require('./reviews'));
router.use('/teams', checkToken, require('./teams'));

// Admin Route Super Pprotected
router.use('/admin', checkToken, checkAdmin, require('./admin'));
router.use('/git', checkToken, checkAdmin, require('./gitTokens'));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

router.use(unknownEndpoint);

module.exports = router;
