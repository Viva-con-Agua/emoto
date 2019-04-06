'use strict';

const QuestionController = require('./QuestionController');
const AnswerController = require('./AnswerController');

class MoodInquiryController{
  static getBasicMoodInquiry(){
    return QuestionController.getAllPublicWithAnswers();
  }

  static getCustomMoodInquiry(userId){
    return QuestionController.getCustomAndPublicWithAnswers(userId);
  }

}

module.exports = MoodInquiryController;