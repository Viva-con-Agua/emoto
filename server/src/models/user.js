'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    crewDropsId: DataTypes.UUID,
    userDropsId: DataTypes.UUID,
    statisticalAnalysis: DataTypes.BOOLEAN,
    contentAnalysis: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Question);
    User.hasMany(models.MoodPicture);
  };
  return User;
};