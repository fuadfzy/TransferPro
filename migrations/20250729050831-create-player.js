'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      ClubId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clubs',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      goals: {
        type: Sequelize.INTEGER
      },
      assists: {
        type: Sequelize.INTEGER
      },
      shotOnTarget: {
        type: Sequelize.INTEGER
      },
      passingAccuracy: {
        type: Sequelize.INTEGER
      },
      successfulTackles: {
        type: Sequelize.INTEGER
      },
      foulsComitted: {
        type: Sequelize.INTEGER
      },
      yellowCards: {
        type: Sequelize.INTEGER
      },
      redCards: {
        type: Sequelize.INTEGER
      },
      successfulHeader: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};