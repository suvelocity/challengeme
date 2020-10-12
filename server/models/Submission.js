'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };
  Submission.init({
    challengeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    state: DataTypes.STRING, // PENDING || FAIL || SUCCESS
    solutionRepository: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Submission',
    tableName: 'submissions'
  });
  return Submission;
};