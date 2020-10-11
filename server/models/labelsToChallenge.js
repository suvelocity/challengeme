'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class labelsToChallenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  labelsToChallenge.init({
    labelId: {
      field: 'label_id',
      type: DataTypes.INTEGER },
    challengeId: {
      field: 'challenge_id',
      type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'labelsToChallenge',
    underscored: true,
  });
  return labelsToChallenge;
};