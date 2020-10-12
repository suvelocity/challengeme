module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn(
      "challenges",
      'boiler_plate',
      {
        type: Sequelize.TEXT,
      })
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('challenges', 'boiler_plate');
  }
}
