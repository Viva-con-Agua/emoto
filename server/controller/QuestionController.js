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

  static getAllCustom(userId){
    return models.Question.findAll({
      where: {
        userId: userId
      }
    });
  }
}

module.exports = QuestionController;