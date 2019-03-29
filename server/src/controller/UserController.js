'use strict';

const models = require('./../models');

class UserController{
  static findOrCreate(userId, crewId){
    return models.User.findOrCreate({
      where: {
        userDropsId: userId
      },
      defaults: {
        crewDropsId: crewId,
        statisticalAnalysis: false,
        contentAnalysis: false
      }
    }).then(function(user){
      return Promise.resolve(user[0]);
    });
  }

  static find(userId){
    return models.User.findOne({
      where: {
        id: userId
      }
    });
  }

  static setSettings(userId, settings){
    return models.User.find({ where: { id: userId } })
    .then(function(u){
      return u.update({
        statisticalAnalysis: settings.statisticalAnalysis,
        contentAnalysis: settings.contentAnalysis
      });
    })
    .then(function(u){
      console.log(u);
      return Promise.resolve(u);
    });
  }
}

module.exports = UserController;