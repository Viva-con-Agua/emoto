'use strict';

const models = require('./../models');
const MoodController = require('./MoodController');

class MoodPicutreController{
  static createMoodPicture(moodPicture){
    //ToDo: Refactore function. Avoid unnecessary inserts!
    return models.MoodPicture.create({
      userId: moodPicture.user,
      date: Date.now()
    })
    .then(function(mP){
      const moods = [];
      let count = 0;
      moodPicture.mood.forEach(function(m){
        if(m.answerId !== null){
          count++;
          moods.push({
            questionId: m.questionId,
            answerId: m.answerId,
            comment: m.comment,
            moodPictureId: mP.dataValues.id
          });
        } 
      });
      if(count === 0){
        return models.MoodPicture.destroy({
          where: {
            id: mP.dataValues.id
          }
        })
        .then(function(){
          throw Error('Answer is needed');
        });
      } 
      return models.Mood.bulkCreate(moods);
    });
  }

  static getLastMoodPicture(userId){
    let moodPicture = null;
    return models.MoodPicture.find({
      where: {
        userId: userId
      },
      order: [
        ['date', 'DESC']
      ]
    })
    .then(function(result){
      moodPicture = result.dataValues;
      return MoodController.getMoodsByMoodPictureId(moodPicture.id);
    })
    .then(function(moods){
      moodPicture.moods = moods;
      return Promise.resolve(moodPicture);
    })
    .catch(function(err){
      console.log(err);
    });
  }

  static getLastMoodPicturePreparedForUI(userId){
    let moodPictureUI = {
      userId: null,
      moodCount : 0,
      moods : {
        negativ: [],
        neutral: [],
        positive: []
      },
      percent : {
        negativ: 0,
        neutral: 0,
        positive: 0
      }
    };
    return MoodPicutreController.getLastMoodPicture(userId)
    .then(function(moodPicture){
      moodPictureUI.userId = moodPicture.userId;
      moodPictureUI.date = moodPicture.date;
      moodPicture.moods.forEach(function(mood){
        moodPictureUI.moodCount++;
        const moodUI = {
          question: mood['Question.question'],
          answer: mood['Answer.answer'],
          weight: mood['Answer.weight']
        };

        switch(moodUI.weight){
          case -3: 
            moodPictureUI.moods.negativ.push(moodUI);
            break;
          case -2: 
            moodPictureUI.moods.negativ.push(moodUI);
            break;
          case -1: 
            moodPictureUI.moods.neutral.push(moodUI);
            break;
          case 1: 
            moodPictureUI.moods.neutral.push(moodUI);
            break;
          case 2: 
            moodPictureUI.moods.positive.push(moodUI);
            break;
          case 3: 
            moodPictureUI.moods.positive.push(moodUI);
            break;
        }
      });

      moodPictureUI.percent.negativ = moodPictureUI.moods.negativ.length / moodPictureUI.moodCount * 100;
      moodPictureUI.percent.neutral = moodPictureUI.moods.neutral.length / moodPictureUI.moodCount * 100;
      moodPictureUI.percent.positive = moodPictureUI.moods.positive.length / moodPictureUI.moodCount * 100;

      return Promise.resolve(moodPictureUI);
    });
  }
}

module.exports = MoodPicutreController;