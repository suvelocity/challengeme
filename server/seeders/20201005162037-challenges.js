'use strict';
//20201005162037-challenges.js
const challenges = require('./seedData/challenges');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('challenges', challenges, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('challenges');
  }
};
