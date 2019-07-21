'use strict';

const models = require('./../models');

class ParticipantController{
  static getVisitorsCount(){
    return models.User.count();
  }

  static getInactiveProfilesCount(){
    return models.User.count({
      where: {
        active : false
      }
    });
  }

  static getActiveProfilesCount(){
    return models.User.count({
      where: {
        active : true
      }
    });
  }

  static getAgreementContentAnalysisCount(){
    return models.User.count({
      where: {
        active : true,
        contentAnalysis: true
      }
    });
  }

  static getAgreementStatisticAnalysisCount(){
    return models.User.count({
      where: {
        active : true,
        statisticalAnalysis: true
      }
    });
  }
}

module.exports = ParticipantController;