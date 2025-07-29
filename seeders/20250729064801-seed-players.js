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
    let players = await fs.readFile('./datas/players.json', 'utf-8')
    players = JSON.parse(players)
    players.forEach(player => {
      delete player.id
      player["createdAt"] = new Date()
      player["updatedAt"] = new Date()
    });

    await queryInterface.bulkInsert('Players', players, {})
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
