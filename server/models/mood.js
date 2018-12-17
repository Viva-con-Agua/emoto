'use strict';
module.exports = (sequelize, DataTypes) => {
  //ToDo Refactore: Foreign Key Fields not necessary at this point
  //But in this case, the inser/create statement will be different
  //A cleanup and refactoring will be useful
  const Mood = sequelize.define('Mood', {
    moodPictureId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    comment:DataTypes.STRING
  }, {});
  Mood.associate = function(models) {
    Mood.belongsTo(models.Question);
    Mood.belongsTo(models.Answer);
    Mood.belongsTo(models.MoodPicture);
  };
  return Mood;
};