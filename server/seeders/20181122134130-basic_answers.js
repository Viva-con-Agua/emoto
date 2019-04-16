'use strict';

const models = require('./../src/models');


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AnswerSets', [
      {
        "posAdjective" : "gut",
        "negAdjective" : "schlecht"
      }
    ])
    .then(function(){
        return models.AnswerSet.findAll();
    })
    .then(function(answerSets){
      return queryInterface.bulkInsert('Answers', [
        {
          "answer": "sehr schlecht",
          "answerSetId": answerSets[0].dataValues.id,
          "weight": -3
        },
        {
          "answer": "schlecht",
          "answerSetId": answerSets[0].dataValues.id,
          "weight": -2
        },
        {
          "answer": "eher schlecht", 
          "answerSetId": answerSets[0].dataValues.id,
          "weight": -1
        },
        {
          "answer": "eher gut", 
          "answerSetId": answerSets[0].dataValues.id,
          "weight": 1
        },
        {
          "answer": "gut",
          "answerSetId": answerSets[0].dataValues.id,
          "weight": 2
        },
        {
          "answer": "sehr gut",
          "answerSetId": answerSets[0].dataValues.id,
          "weight": 3
        }
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Answers', null, {})
    .then(function(){
      return queryInterface.bulkDelete('AnswerSets', null, {});
    });
  }
};
