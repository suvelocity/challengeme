'use strict';
const labels  = require('./seedData/labels')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('labels', labels, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('labels');
  }
}

