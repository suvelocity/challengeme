'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };
  Challenge.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    repositoryName:{
      type: DataTypes.STRING,
      field:"repository_name"
    },
    cover: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Challenge',
    tableName: 'challenges'
  });
  return Challenge;
};