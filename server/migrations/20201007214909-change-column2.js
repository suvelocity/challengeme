'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("images","img",{type:Sequelize.TEXT("long")})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("images","img",{type:Sequelize.TEXT})

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
