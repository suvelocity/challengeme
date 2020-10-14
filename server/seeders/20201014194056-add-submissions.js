'use strict';
const submissions  = require('./seedData/submissions')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('submissions', submissions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('submissions');
  }
}

