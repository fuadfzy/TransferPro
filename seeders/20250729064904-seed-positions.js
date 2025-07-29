'use strict';
const fs = require('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let positions = await fs.readFile('./datas/positions.json', 'utf-8')
    positions = JSON.parse(positions)
    positions.forEach(position => {
      delete position.id
      position["createdAt"] = new Date()
      position["updatedAt"] = new Date()
    });

    await queryInterface.bulkInsert('Positions', positions, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
