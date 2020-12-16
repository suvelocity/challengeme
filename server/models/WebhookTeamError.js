const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WebhookTeamError extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.WebhookTeam, {
        foreignKey: 'webhookId',
      });
      // define association here
    }
  }
  WebhookTeamError.init({
    webhookId: DataTypes.INTEGER,
    statusCode: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    data: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'WebhookTeamError',
    tableName: 'webhook_team_errors',
  });
  return WebhookTeamError;
};
