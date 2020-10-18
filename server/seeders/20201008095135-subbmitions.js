'use strict';
const submissions = require('./seedFiles/submissions');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('submissions', submissions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('submissions', null, {});
  }
};
