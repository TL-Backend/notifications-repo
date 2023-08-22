'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class token_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  token_table.init({
    token: DataTypes.STRING,
    device: DataTypes.STRING,
    user_id: DataTypes.STRING,
    created_at: {
      type: 'TIMESTAMP'
    },
    updated_at: {
      type: 'TIMESTAMP'
    }
  }, {
    sequelize,
    modelName: 'token_table',
    underscored: true
  });
  return token_table;
};