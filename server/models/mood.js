'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mood = sequelize.define('Mood', {
    moodPictureId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
    //ToDo: Add note field
  }, {});
  Mood.associate = function(models) {
    Mood.belongsTo(models.User);
    Mood.belongsTo(models.Question);
    Mood.belongsTo(models.Answer);
    Mood.belongsTo(models.MoodPicture);
  };
  return Mood;
};