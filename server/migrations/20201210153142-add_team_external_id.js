module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('teams', 'external_id', {
      type: Sequelize.UUID,
      unique: true,
      allowNull: true,
    });
    await queryInterface.addColumn('teams', 'creator', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('teams', 'external_id');
    await queryInterface.removeColumn('teams', 'creator');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
