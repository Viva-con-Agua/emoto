'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    crewDropsId: DataTypes.UUID,
    userDropsId: DataTypes.UUID
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Question);
  };
  return User;
};