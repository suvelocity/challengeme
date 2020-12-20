const challenges = require('./seedFiles/challenges');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('challenges', challenges, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('challenges', null, {});
  },
};
