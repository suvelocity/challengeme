'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Webhook_team_events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      team_inside_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      webhook_url: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      authorization_token: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      events: {
        allowNull: false,
        type: Sequelize.JSON
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Webhook_team_events');
  }
};