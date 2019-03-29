'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerSet = sequelize.define('AnswerSet', {
    posAdjective: DataTypes.STRING,
    negAdjective: DataTypes.STRING
  }, {});
  AnswerSet.associate = function(models) {
    AnswerSet.hasMany(models.Answer);
    AnswerSet.hasMany(models.Question);
  };
  return AnswerSet;
};