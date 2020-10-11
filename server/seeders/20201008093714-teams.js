'use strict';
const teams = require('../_tests_/statistics/seeders/seedFiles');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('teams', teams, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('teams', null, {});
  }
};
