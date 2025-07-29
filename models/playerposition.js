'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayerPosition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlayerPosition.init({
    PlayerId: DataTypes.INTEGER,
    PositionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlayerPosition',
  });
  return PlayerPosition;
};