'use strict';

const models = require('./../models');
const MoodController = require('./MoodController');
const MoodPictureHelper = require('./../helper/MoodPictureHelper');

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

  static getMoodPictures(userId, quantity){
    return models.MoodPicture.findAll({
      where: {
        userId: userId
      },
      order: [
        ['date', 'DESC']
      ],
      limit: quantity
    })
    .then(function(result){
      return Promise.all(result.map(function(r){
        return MoodPictureHelper.getMoodsForMoodPicture(r.dataValues)
        .then(function(mood){
          return MoodPictureHelper.prepareMoodPictureForUI(mood);
        });
      }));
    });
  }

  static getMoodPictureByDate(userId, date){
    
  }

  static getMoodPictureById(userId,id){
    return models.MoodPicture.findOne({
      where: {
        userId: userId,
        id: id
      }
    })
    .then(function(result){
      return MoodPictureHelper.getMoodsForMoodPicture(result.dataValues);
    });
  }

  static getMoodPictureByIdPreparedForUI(userId, id){
    return MoodPicutreController.getMoodPictureById(userId, id)
    .then(function(moodPicture){
      return MoodPictureHelper.prepareMoodPictureForUI(moodPicture);
    });
  }

  static getMoodPictureIds(userId, quantity, offset){

    let response = {
      id: [],
      offset: offset,
      count: undefined
    };
    return models.MoodPicture.findAll({
      attributes: ['id'],
      where: {
        userId: userId
      },
      limit: quantity,
      offset: offset,
      order: [
        ['date', 'DESC']
      ],
    //  raw:true
    })
    .then(function(result){
      
      result.forEach(function(record){
        response.id.push(record.id);
      });
      
      return MoodPicutreController.getMoodPictureCount(userId);
    })
    .then(function(count){
      response.count = count;
      return Promise.resolve(response);
    });
  }

  static getMoodPictureCount(userId){
    return models.MoodPicture.findAndCountAll({
      where: {
        userId: userId
      }
    })
    .then(function(result){
      return Promise.resolve(result.count);
    })
  }

  static getLastMoodPicture(userId){
    return models.MoodPicture.findOne({
      attributes: ['id'],
      where: {
        userId: userId
      },
      order: [
        ['date', 'DESC']
      ]
    })
    .then(function(result){
      return MoodPictureHelper.getMoodsForMoodPicture(result.dataValues);
    })
    .catch(function(err){
      console.log(err);
    });
  }

  static getLastMoodPictureId(userId){
    return models.MoodPicture.findOne({
      where: {
        userId: userId
      },
      order: [
        ['date', 'DESC']
      ]
    })
    .catch(function(err){
      console.log(err);
    });
  }

  static getLastMoodPicturePreparedForUI(userId){
    return MoodPicutreController.getLastMoodPicture(userId)
    .then(function(moodPicture){
      return MoodPictureHelper.prepareMoodPictureForUI(moodPicture);
    });
  }
}

module.exports = MoodPicutreController;