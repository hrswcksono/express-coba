"use strict";
const { encryptPwd } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "John Doe",
          name: "johndoe",
          email: "john@gmail.com",
          password: encryptPwd("123456"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Admin",
          name: "admin",
          email: "admin@gmail.com",
          password: encryptPwd("admin"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
