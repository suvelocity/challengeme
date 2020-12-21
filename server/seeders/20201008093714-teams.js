const teams = require('./seedFiles/teams');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('teams', teams, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('teams', null, {});
  },
};
