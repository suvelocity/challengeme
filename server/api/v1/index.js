const { Router } = require('express');

const router = Router();
const checkToken = require('../../middleware/checkToken');
const checkAdmin = require('../../middleware/checkAdmin');

// Authentication
router.use('/auth', require('./auth'));

router.use('/webhook', checkToken, require('./webhook'));
router.use('/submissions', checkToken, require('./submissions'));
router.use('/challenges', checkToken, require('./challenges'));
router.use('/users', checkToken, require('./users'));
router.use('/services', checkToken, require('./services'));
router.use('/image', checkToken, require('./image'));
router.use('/types', checkToken, require('./types'));
router.use('/labels', checkToken, require('./labels'));
router.use('/reviews', checkToken, require('./reviews'));
router.use('/insights', checkToken, require('./insightsRoutes'));
router.use('/teams', checkToken, require('./teams'));

// Admin Route Super Protected
router.use('/git', checkToken, checkAdmin, require('./gitTokens'));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

router.use(unknownEndpoint);

module.exports = router;
