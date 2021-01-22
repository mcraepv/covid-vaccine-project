'use strict';
module.exports = (sequelize, DataTypes) => {
  const Waitlists = sequelize.define('Waitlists', {
    id: DataTypes.STRING,
    userId: DataTypes.STRING,
    day: DataTypes.DATE
  }, {});
  Waitlists.associate = function(models) {
    // associations can be defined here
  };
  return Waitlists;
};