'use strict';
const submissions = require('../_tests_/statistics/mocks/submissions');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Submissions', submissions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Submissions', null, {});
  }
};
