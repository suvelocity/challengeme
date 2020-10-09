'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users', // table name
      'github_user', // new field name
      {
        type: Sequelize.BOOLEAN
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'users',
      'github_user'
    )
  }
};
