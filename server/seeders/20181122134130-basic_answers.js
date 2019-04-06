'use strict';

const models = require('./../src/models');


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AnswerSets', [
      {
        "posAdjective" : "positiv",
        "negAdjective" : "negativ"
      }
    ])
    .then(function(){
        return models.AnswerSet.findAll();
    })
    .then(function(answerSets){
      return queryInterface.bulkInsert('Answers', [
        {
          "answer": "sehr negativ",
          "answerSetId": answerSets[0].dataValues.id,
          "weight": -3
        },
        {
          "answer": "negativ",
          "answerSetId": answerSets[0].dataValues.id,
          "weight": -2
        },
        {
          "answer": "eher negativ", 
          "answerSetId": answerSets[0].dataValues.id,
          "weight": -1
        },
        {
          "answer": "eher positiv", 
          "answerSetId": answerSets[0].dataValues.id,
          "weight": 1
        },
        {
          "answer": "positiv",
          "answerSetId": answerSets[0].dataValues.id,
          "weight": 2
        },
        {
          "answer": "sehr positiv",
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
