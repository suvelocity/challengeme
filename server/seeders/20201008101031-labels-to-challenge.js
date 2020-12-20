const labelsToChallenge = require('./seedFiles/labelsToChallenge');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('labels_to_challenges', labelsToChallenge, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('labels_to_challenges', null, {});
  },
};
