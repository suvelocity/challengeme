const labels = require('./seedFiles/labels');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('labels', labels, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('labels', null, {});
  },
};
