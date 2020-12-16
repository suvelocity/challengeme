const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WebhookEventTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.WebhookTeam, {
        foreignKey: 'webhookId',
      });
      this.belongsTo(models.WebhookEvent, {
        foreignKey: 'eventId',
      });
      // define association here
    }
  }
  WebhookEventTeam.init({
    webhookId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'WebhookEventTeam',
    tableName: 'webhook_events_teams',
  });
  return WebhookEventTeam;
};
