'use strict';
const usersTeams = require('../_tests_/statistics/seeders/seedFiles');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users_teams', usersTeams, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users_teams', null, {});
  }
};