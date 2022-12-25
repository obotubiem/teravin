"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employeeAddresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      detailAddress: {
        type: Sequelize.STRING,
      },
      mainAddress: {
        type: Sequelize.BOOLEAN,
      },
      employeeId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employeeAddresses");
  },
};
