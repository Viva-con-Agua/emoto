'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: DataTypes.STRING,
    weight: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.hasMany(models.Mood);
    Answer.belongsTo(models.AnswerSet);
  };
  return Answer;
};