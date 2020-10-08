'use strict';
const submissions = require('../_tests_/statistics/seeders/seedFiles');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Submissions', submissions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Submissions', null, {});
  }
};
