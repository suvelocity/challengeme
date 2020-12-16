const images = require('./seedFiles/images');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('images', images, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('images', null, {});
  },
};
