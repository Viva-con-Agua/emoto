'use strict';

const models = require('./../models');

class QuestionController{
  static getAllPublic(){
    return models.Question.findAll({
      where: {
        userId: null
      }
    });
  }

  static getAllPublicWithAnswers(){
    return models.Question.findAll({
      where: {
        userId: null
      },
      include: [
        {
          model: models.AnswerSet, 
          include: [
            models.Answer
          ]  
        }
      ]
    });
  }

  static getAllCustom(userId){
    return models.Question.findAll({
      where: {
        userId: userId
      }
    });
  }
}

module.exports = QuestionController;