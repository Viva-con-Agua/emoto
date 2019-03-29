'use strict';

const models = require('./../models');

const DEFAULT_ANSWER_SET = 2;

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

  static getCustomAndPublicWithAnswers(userId){
    return models.Question.findAll({
      where: {
        $or: [
          {userId: null},
          {userId: userId}
        ]
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

  static createCustomQuestion(userId, question){
    return models.Question.create({
      userId: userId,
      question: question,
      answerSetId: DEFAULT_ANSWER_SET
    });
  }

  static createCustomQuestions(userId, questions){
    return Promise.all(questions.map(function(q){
      return Promise.resolve({
        userId: userId,
        question: q,
        answerSetId: DEFAULT_ANSWER_SET
      });
    }))
    .then(function(questionsDBObj){
      return models.Question.bulkCreate(questionsDBObj);
    });
  }
}

module.exports = QuestionController;