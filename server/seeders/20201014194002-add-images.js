'use strict';
const images = require('./seedData/images')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('images', images, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('images');
  }
}

