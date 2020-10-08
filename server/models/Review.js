'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      this.belongsTo(models.Challenge, {
        foreignKey: 'challengeId'
      })
    }
  };
  Review.init({
    userId: DataTypes.INTEGER,
    challengeId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
    tableName: "Reviews",
    paranoid: true,
  });
  return Review;
};