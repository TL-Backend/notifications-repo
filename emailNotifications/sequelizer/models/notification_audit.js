'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification_audit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notification_audit.init({
    channel: DataTypes.STRING,
    message_body: DataTypes.STRING,
    status: DataTypes.STRING,
    error_response: DataTypes.STRING,
    group_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    success_response: DataTypes.STRING,
    template_id: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    email: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notification_audit',
  });
  return notification_audit;
};