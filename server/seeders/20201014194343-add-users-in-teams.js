'use strict';
const usersTeams = require('./seedData/usersTeams')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users_teams', usersTeams, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users_teams');
  }
}

