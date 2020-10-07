'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('refresh_tokens', 'token', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('refresh_tokens', 'token', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
