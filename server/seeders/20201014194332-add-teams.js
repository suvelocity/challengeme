'use strict';
const teams  = require('./seedData/teams')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('teams', teams, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('teams');
  }
}

