'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, { through: 'UsersTeams', foreignKey: 'teamId' });
    }
  };
  Teams.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teams',
  });
  return Teams;
};