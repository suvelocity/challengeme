const submissions = require('./seedFiles/submissions');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('submissions', submissions, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('submissions', null, {});
  },
};
