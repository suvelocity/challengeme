'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'challenges', // table name
      'cover', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'challenges', // table name
      'cover', // new field name
    )
  }
};
