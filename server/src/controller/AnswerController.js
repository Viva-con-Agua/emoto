'use strict';

const models = require('./../models');

class AnswerController{
  static getAll(){
    return models.Answer.findAll();
  }
}

module.exports = AnswerController;