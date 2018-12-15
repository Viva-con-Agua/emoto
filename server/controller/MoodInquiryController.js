'use strict';

const QuestionController = require('./QuestionController');
const AnswerController = require('./AnswerController');

class MoodInquiryController{
  static getBasicMoodInquiry(){
    return QuestionController.getAllPublicWithAnswers();
  }

}

module.exports = MoodInquiryController;