const challenges = require('./seedFiles/challenges');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('challenges', challenges, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('challenges', null, {});
  },
};
