'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification_audits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notification_audits.init({
    channel: DataTypes.STRING,
    contact_details: DataTypes.JSONB,
    status: DataTypes.STRING,
    success_response: DataTypes.JSONB,
    error_response: DataTypes.JSONB,
    content: DataTypes.JSONB,
    user_id: DataTypes.STRING,
    group_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notification_audits',
    underscored: true
  });
  return notification_audits;
};