'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Challenge, { foreignKey: 'ChallengeId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Review.init(
    {
      userId: { type: DataTypes.INTEGER, field: 'user_id', allowNull: false },
      challengeId: {
        type: DataTypes.INTEGER,
        field: 'challenge_id',
        allowNull: false,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      rating: { type: DataTypes.INTEGER, allowNull: false },
      deletedAt: { type: DataTypes.DATE, field: 'deleted_at' },
    },
    {
      sequelize,
      modelName: 'Review',
      paranoid: true,
    }
  );
  return Review;
};
