const teams = require('./seedFiles/teams');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('teams', teams, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('teams', null, {});
  },
};
