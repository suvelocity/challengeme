const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WebhookEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.WebhookTeam, {
        through: 'WebhookEventTeam',
        foreignKey: 'eventId',
      });
      this.hasMany(models.WebhookEventTeam, {
        foreignKey: 'eventId',
      });
      // define association here
    }
  }
  WebhookEvent.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'WebhookEvent',
    tableName: 'webhook_events',
  });
  return WebhookEvent;
};
