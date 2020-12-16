const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WebhookTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.WebhookEvent, {
        through: 'WebhookEventTeam',
        foreignKey: 'webhookId',
      });
      this.hasMany(models.WebhookEventTeam, {
        foreignKey: 'webhookId',
      });
      this.hasMany(models.WebhookTeamError, {
        foreignKey: 'webhookId',
      });
      this.belongsTo(models.Team, {
        foreignKey: 'teamId',
      });
      // define association here
    }
  }
  WebhookTeam.init({
    teamId: DataTypes.INTEGER,
    webhookUrl: DataTypes.TEXT,
    authorizationToken: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'WebhookTeam',
    tableName: 'webhooks_teams',
  });
  return WebhookTeam;
};
