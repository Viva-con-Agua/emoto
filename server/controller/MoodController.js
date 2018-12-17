'use strict';

const models = require('./../models');

class MoodController{
  static getMoods(){
    return {};
  }

  static getMood(){
    return {};
  }

  static addMood(mood){
    return Promise.resolve(mood);
  }

  static getMoodsByMoodPictureId(moodPictureId){
    return models.Mood.findAll({
      where: {
        moodPictureId: moodPictureId
      },
      include: [
        models.Question,
        models.Answer
      ],
      raw: true
    });
  }
}

module.exports = MoodController;