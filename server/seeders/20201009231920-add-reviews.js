"use strict";
const reviews = require("../_tests_/mocks/reviews");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("reviews", reviews, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};