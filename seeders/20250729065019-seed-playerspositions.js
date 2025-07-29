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
    let playerspositions = await fs.readFile('./datas/players_positions.json', 'utf-8')
    playerspositions = JSON.parse(playerspositions)
    playerspositions.forEach(playerposition => {
      delete playerposition.id
      playerposition["createdAt"] = new Date()
      playerposition["updatedAt"] = new Date()
    });

    await queryInterface.bulkInsert('PlayerPositions', playerspositions, {})
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
