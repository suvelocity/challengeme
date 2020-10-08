'use strict';
const reviews = require('../_tests_/statistics/seeders/seedFiles');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Reviews', reviews, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
