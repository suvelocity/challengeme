'use strict';
<<<<<<< HEAD:server/seeders/20201014194035-add-lables-for-challenges.js
const labelsToChallenges  = require('./seedData/labelsToChallenges')
=======
const labelsToChallenge = require('./seedFiles/labelsToChallenge');

>>>>>>> refactor_client:server/seeders/20201008101031-labels-to-challenge.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('labels_to_challenges', labelsToChallenges, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('labels_to_challenges');
  }
}

