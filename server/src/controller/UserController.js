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
        contentAnalysis: false,
        active: false
      }
    }).then(function(user){
      return Promise.resolve(user[0]);
    });
  }

  static create(userId, crewId){
    return models.User.create({
      crewDropsId: crewId,
      userDropsId: userId,
      statisticalAnalysis: false,
      contentAnalysis: false,
      active: false
    });
  }

  static find(userId, crewId){
    return models.User.findOne({
      where: {
        id: userId
      }
    });
  }

  static findByDropsId(userDropsId){
    return models.User.findOne({
      where: {
        userDropsId: userDropsId
      }
    });
  }

  static setSettings(userId, settings){
    return models.User.find({ where: { id: userId } })
    .then(function(u){
      return u.update({
        statisticalAnalysis: settings.statisticalAnalysis,
        contentAnalysis: settings.contentAnalysis,
        active: true
      });
    })
    .then(function(u){
      return Promise.resolve(u);
    });
  }
}

module.exports = UserController;