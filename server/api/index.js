const express = require('express');
const api = express.Router();
const helmet = require("helmet");

api.use(helmet());

api.use('/v1', require('./v1'));

module.exports = api;
