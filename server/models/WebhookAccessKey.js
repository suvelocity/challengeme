const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WebhookAccessKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Team, {
        foreignKey: 'creator',
      });
      // define association here
    }
  }
  WebhookAccessKey.init({
    key: DataTypes.UUID,
    entityName: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'WebhookAccessKey',
    tableName: 'webhook_access_keys',
  });
  return WebhookAccessKey;
};
