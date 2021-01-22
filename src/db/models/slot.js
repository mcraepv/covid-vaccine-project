'use strict';
module.exports = (sequelize, DataTypes) => {
  const Slot = sequelize.define('Slot', {
    id: DataTypes.STRING,
    day: DataTypes.DATE,
    slotNumber: DataTypes.INTEGER,
    locationId: DataTypes.STRING,
    isReserved: DataTypes.BOOLEAN
  }, {});
  Slot.associate = function(models) {
    // associations can be defined here
  };
  return Slot;
};