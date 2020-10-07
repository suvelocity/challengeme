'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'user_name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'user_name', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
