module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users_teams', 'permission', {
      type: Sequelize.DataTypes.ENUM,
      values: ['teacher', 'student'],
      defaultValue: 'student',
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users_teams', 'permission');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
