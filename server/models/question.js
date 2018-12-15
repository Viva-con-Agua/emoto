'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    timestamps: true
  });
  Question.associate = function(models) {
    Question.belongsTo(models.User);
    Question.belongsTo(models.AnswerSet);
    Question.hasMany(models.Mood);
  };
  return Question;
};