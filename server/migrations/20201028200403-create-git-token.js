module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('git_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.DataTypes.ENUM,
        values: ['blocked', 'available'],
        defaultValue: 'available',
      },
      resets_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      git_account: {
        type: Sequelize.STRING,
      },
      actions_limit: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('git_tokens');
  },
};
