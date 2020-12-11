'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WebhookTeamEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Team, {
        foreignKey: 'teamId'
      });
      // define association here
    }
  };
  WebhookTeamEvent.init({
    teamId: DataTypes.UUID,
    teamInsideId: DataTypes.INTEGER,
    webhookUrl: DataTypes.TEXT,
    authorizationToken: DataTypes.TEXT,
    events: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'WebhookTeamEvent',
    tableName: 'Webhook_team_events'
  });
  return WebhookTeamEvent;
};