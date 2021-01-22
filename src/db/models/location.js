'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    id: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    numberOfSlots: DataTypes.NUMBER
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};