'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'phone_number', {
      type: Sequelize.STRING
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'phone_number', {
      type: Sequelize.INTEGER
      }
    )
  }
};
