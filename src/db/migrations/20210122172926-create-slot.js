"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Slots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      day: {
        type: Sequelize.DATE,
      },
      slotNumber: {
        type: Sequelize.INTEGER,
      },
      locationId: {
        type: Sequelize.STRING,
      },
      isReserved: {
        type: Sequelize.BOOLEAN,
      },
      userId: {
        type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Slots");
  },
};
