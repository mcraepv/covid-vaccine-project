'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guarantees = sequelize.define('Guarantees', {
    id: DataTypes.STRING,
    userId: DataTypes.STRING,
    day: DataTypes.DATE
  }, {});
  Guarantees.associate = function(models) {
    // associations can be defined here
  };
  return Guarantees;
};