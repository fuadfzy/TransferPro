'use strict';
const Helper = require('../helpers/helper')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Club.hasOne(models.User, {
        foreignKey: "ClubId",
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      Club.hasMany(models.Player, {
        foreignKey: 'ClubId',
        as: 'players',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }

    get budgetGbp(){
      return Helper.getPounds(this.transferBudget)
    } 
  }
  Club.init({
    clubName: DataTypes.STRING,
    transferBudget: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Club',
  });
  return Club;
};