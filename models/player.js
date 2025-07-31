'use strict';
const {
  Model
} = require('sequelize');

const Helper = require('../helpers/helper')
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.belongsTo(models.Club, {
        foreignKey: "ClubId",
        as: "club",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })

      Player.belongsToMany(models.Position, {
        as: 'positions',
        through: models.PlayerPosition,
        foreignKey: "PlayerId",
        otherKey: 'PositionId'
      })
    }

    get priceGbp(){
      return Helper.getPounds(this.price)
    }
  }
  Player.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    ClubId: DataTypes.INTEGER,
    goals: DataTypes.INTEGER,
    assists: DataTypes.INTEGER,
    shotOnTarget: DataTypes.INTEGER,
    passingAccuracy: DataTypes.INTEGER,
    successfulTackles: DataTypes.INTEGER,
    foulsComitted: DataTypes.INTEGER,
    yellowCards: DataTypes.INTEGER,
    redCards: DataTypes.INTEGER,
    successfulHeader: DataTypes.INTEGER,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};