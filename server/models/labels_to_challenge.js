'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class labels_to_challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  labels_to_challenge.init({
    labelId: {
      field: 'label_id',
      type: DataTypes.INTEGER },
    challengeId: {
      field: 'challenge_id',
      type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'labels_to_challenge',
    underscored: true,
  });
  return labels_to_challenge;
};