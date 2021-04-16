const v1Router = require('express').Router();
const checkToken = require('../../middleware/checkToken');
const checkAdmin = require('../../middleware/checkAdmin');


//= =======================Public Routes================================//
v1Router.use('/challenges', require('./challenges')); // remove boiler plate
v1Router.use('/images', require('./images'));
v1Router.use('/labels', require('./labels'));
v1Router.use('/reviews', require('./reviews'));

//= =======================Authentication================================//
v1Router.use('/auth', require('./auth'));

//= =======================Webhooks================================//
v1Router.use('/webhooks', require('./webhooks'));

//= =======================Private Routes================================//
v1Router.use('/submissions', checkToken, require('./submissions'));
v1Router.use('/users', checkToken, require('./users'));
v1Router.use('/services', checkToken, require('./services'));
v1Router.use('/types', checkToken, require('./types'));
v1Router.use('/insights', checkToken, require('./insightsRoutes'));
v1Router.use('/teams', checkToken, require('./teams'));
v1Router.use('/assignments', checkToken, require('./assignments'));

//= =======================Admin Route Super Protected=====================//
v1Router.use('/git', checkToken, checkAdmin, require('./gitTokens'));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

v1Router.use(unknownEndpoint);

module.exports = v1Router;
