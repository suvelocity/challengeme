module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('webhooks_teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      team_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      webhook_url: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      authorization_token: {
        allowNull: false,
        type: Sequelize.TEXT,
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
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('webhooks_teams');
  },
};
