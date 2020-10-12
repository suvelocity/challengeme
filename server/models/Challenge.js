"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
  
    static associate(models) {
      this.belongsTo(models.User, {foreignKey:"userId"});
      this.belongsToMany(models.Label, {
        through: "labels_to_challenges",
        foreignKey: "challenge_id",
      });
      this.hasMany(models.Review, {
        foreignKey: "challengeId",
      });
    }
  }
  Challenge.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      repositoryName: DataTypes.STRING,
      boilerPlate: DataTypes.STRING,
      cover: DataTypes.STRING,
      category: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Challenge",
      tableName: "challenges",
    }
  );
  return Challenge;
};
