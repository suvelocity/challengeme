'use strict';
const challenges = require('../_tests_/statistics/mocks/challenges');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('challenges', challenges, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('challenges', null, {});
  }
};
