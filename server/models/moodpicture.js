'use strict';
module.exports = (sequelize, DataTypes) => {
  const MoodPicture = sequelize.define('MoodPicture', {
    userId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  MoodPicture.associate = function(models) {
    MoodPicture.belongsTo(models.User);
    MoodPicture.hasMany(models.Mood);
  };
  return MoodPicture;
};