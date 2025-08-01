'use strict';
const fs = require('fs').promises
const bcrypt = require('bcryptjs');

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
    let users = await fs.readFile('./datas/users.json', 'utf-8')
    users = JSON.parse(users)
    for (let user of users) {
 
      delete user.id;

      user.password = await bcrypt.hash(user.password, 10);
      user.createdAt = new Date();
      user.updatedAt = new Date();
     }

    await queryInterface.bulkInsert('Users', users, {})
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
