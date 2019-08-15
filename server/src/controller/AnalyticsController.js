'use strict';

const ParticipantController = require('./ParticipantController');
const models = require('./../models');

const PARTICIPANTS_NWT = 700;

const createQuery = function(id){
  return 'SELECT\
            Answers.answer,\
            IFNULL(Answer_Summary.quantity, 0) AS quantity\
          FROM Answers\
          LEFT JOIN \
            (\
              SELECT Answers.id as answer_id, answer, count(answer) AS quantity FROM Moods\
              RIGHT JOIN Answers ON Moods.answerId = Answers.id\
              INNER JOIN MoodPictures ON Moods.moodPictureId = MoodPictures.id\
              INNER JOIN Users ON MoodPictures.userId = Users.id\
              WHERE questionId = '+id+'\
              AND Users.active = 1\
              AND Users.statisticalAnalysis = 1\
              GROUP BY Moods.answerId\
              ORDER BY Moods.answerId DESC\
            ) AS Answer_Summary\
          ON Answer_Summary.answer_id = Answers.id;';
    };

class AnalyticsController{
  static getParticipants(){

    let data = {
      nwt: PARTICIPANTS_NWT,
      visitors : -1,
      inactive : -1,
      active: -1,
      contentAnalysis: -1,
      statisticAnalysis: -1
    };

    return ParticipantController.getVisitorsCount()
    .then(function(result){
      data.visitors =  result;
      return ParticipantController.getInactiveProfilesCount();
    })
    .then(function(result){
      data.inactive =  result;
      return ParticipantController.getActiveProfilesCount();
    })
    .then(function(result){
      data.active =  result;
      return ParticipantController.getAgreementContentAnalysisCount();
    })
    .then(function(result){
      data.contentAnalysis =  result;
      return ParticipantController.getAgreementStatisticAnalysisCount();
    })
    .then(function(result){
      data.statisticAnalysis =  result;
      return Promise.resolve(data);
    });
  }

  static getCrews(){
    const query  = 'SELECT c.count as users, count(c.count) as crews FROM (SELECT count(crewDropsId) as count from Users WHERE crewDropsId IS NOT NULL GROUP BY crewDropsId) as c GROUP BY c.count';
    return models.sequelize.query(query)
    .then(function(r){
      return Promise.resolve(r[0]);
    });
  }

  static getMoods(){
    let response = null;
    const query_questions = 'SELECT * FROM Questions WHERE userId IS NULL;'
    
    return models.sequelize.query(query_questions)
    .then(function(r){
      response = r[0];
      let data = {}
      return Promise.all(response.map(function(q){
        const query = createQuery(q.id);
        return models.sequelize.query(query)
        .then(function(r){
          data[q.id] = r[0];
          return Promise.resolve();
        });
      }))
      .then(function(){
      return Promise.resolve(data);
      });
      
    })
    .then(function(answers){
      let index = 0;
      return Promise.all(response.map(function(a){
        let tmp = a;
        tmp.answers = answers[a.id];
        return Promise.resolve(a);
      }));
    
    });
  }

  static getMood(id){
    const query = createQuery(id);

    return models.sequelize.query(query)
    .then(function(r){
      return Promise.resolve(r[0]);
    });
  }
}

module.exports = AnalyticsController;