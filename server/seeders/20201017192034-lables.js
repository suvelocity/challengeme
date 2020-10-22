const labels = require('./seedFiles/labels');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('labels', labels, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('labels', null, {});
  },
};
