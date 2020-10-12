"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Submission, {
        foreignKey: "userId",
      });
      this.belongsToMany(models.Teams, { through: 'UsersTeams', foreignKey: 'userId' });
      this.hasMany(models.Review, {
        foreignKey: 'challengeId'
      })
      this.hasMany(models.RefreshToken, {
        foreignKey: "userName",
      });
      this.hasMany(models.Challenge, {
        foreignKey: "author",
        sourceKey: "id"
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      githubAccount: DataTypes.STRING,
      reasonOfRegistration: DataTypes.STRING,
      securityQuestion: DataTypes.STRING,
      securityAnswer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    }
  );
  return User;
};
