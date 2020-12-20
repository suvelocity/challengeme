const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Team, {
        foreignKey: 'teamId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      // define association here
    }
  }
  UserTeam.init({
    teamId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    permission: {
      defaultValue: 'student',
      type: DataTypes.ENUM('teacher', 'student'),
    },
  }, {
    sequelize,
    modelName: 'UserTeam',
    tableName: 'users_teams',
  });
  return UserTeam;
};
