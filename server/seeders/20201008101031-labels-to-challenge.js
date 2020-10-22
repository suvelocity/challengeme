'use strict';
const labelsToChallenge = require('./seedFiles/labelsToChallenge');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('labels_to_challenges', labelsToChallenge, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('labels_to_challenges', null, {});
  }
};