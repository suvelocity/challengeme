'use strict';
const labels_to_challenges = require('./seedFiles/labels_to_challenges');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('labels_to_challenges', labels_to_challenges, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('labels_to_challenges', null, {});
  }
};
