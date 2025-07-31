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

    static async getTopScorer(){
      return await Player.findOne({
        include: 'club',
        order: [['goals', 'DESC']]
      })
    }


  }
  Player.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Player name cannot be empty' },
      notNull: { msg: 'Player name is required' }
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Price cannot be empty' },
      notNull: { msg: 'Price is required' },
      isInt: { msg: 'Price must be a valid number' },
      min: {
        args: [0],
        msg: 'Price must be greater than or equal to 0'
      }
    }
  },
  ClubId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Club is required' },
      notNull: { msg: 'Club is required' },
      isInt: { msg: 'Club ID must be a valid number' }
    }
  },
  goals: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  assists: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  shotOnTarget: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  passingAccuracy: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  successfulTackles: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  foulsComitted: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  yellowCards: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  redCards: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  successfulHeader: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Age is required' },
      notNull: { msg: 'Age is required' },
      isInt: { msg: 'Age must be a valid number' },
      min: {
        args: [16],
        msg: 'Age must be 16 or older'
      },
      max: {
        args: [45],
        msg: 'Age must be 45 or younger'
      }
    }
  },
}, {
  sequelize,
  modelName: 'Player',
  hooks: {
    beforeCreate: (player, options) => {
      player.goals = Math.floor(Math.random() * 30) + 1;
      player.assists = Math.floor(Math.random() * 30) + 1;
      player.shotOnTarget = Math.floor(Math.random() * 30) + 1;
      player.passingAccuracy = Math.floor(Math.random() * 30) + 1;
      player.successfulTackles = Math.floor(Math.random() * 30) + 1;
      player.foulsComitted = Math.floor(Math.random() * 30) + 1;
      player.yellowCards = Math.floor(Math.random() * 30) + 1;
      player.redCards = Math.floor(Math.random() * 30) + 1;
      player.successfulHeader = Math.floor(Math.random() * 30) + 1;
    }
  }
});
  return Player;
};