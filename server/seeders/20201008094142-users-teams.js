const usersTeams = require('./seedFiles/usersTeams');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users_teams', usersTeams, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users_teams', null, {});
  },
};
