'use strict';

const MoodController = require('./../controller/MoodController');

class MoodPictureHelper{
  static prepareMoodPictureForUI(moodPicture){
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
  }

  static getMoodsForMoodPicture(moodPicture){
    return MoodController.getMoodsByMoodPictureId(moodPicture.id)  
    .then(function(moods){
      moodPicture.moods = moods;
      return Promise.resolve(moodPicture);
    });
  }
}

module.exports = MoodPictureHelper;