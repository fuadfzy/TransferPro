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
    let clubs = await fs.readFile('./datas/clubs.json', 'utf-8')
    clubs = JSON.parse(clubs)
    clubs.forEach(club => {
      delete club.id
      club["createdAt"] = new Date()
      club["updatedAt"] = new Date()
    });

    await queryInterface.bulkInsert('Clubs', clubs, {})
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
