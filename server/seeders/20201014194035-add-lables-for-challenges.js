'use strict';
const labelsToChallenges  = require('./seedData/labelsToChallenges')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('labels_to_challenges', labelsToChallenges, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('labels_to_challenges');
  }
}

