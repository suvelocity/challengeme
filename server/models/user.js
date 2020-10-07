'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(model.Submissions, {
        foreignKey: "userId"
      }
      )
    }
  };
  User.init({
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
    securityAnswer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};