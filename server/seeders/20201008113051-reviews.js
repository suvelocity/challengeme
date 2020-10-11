'use strict';
const reviews = require('./seedFiles/reviews');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Reviews', reviews, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
