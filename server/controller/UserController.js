'use strict';

const models = require('./../models');

class UserController{
  static findOrCreate(userId, crewId){
    return models.User.findOrCreate({
      where: {
        userDropsId: userId
      },
      defaults: {
        crewDropsId: crewId
      }
    }).then(function(user){
      return Promise.resolve(user[0]);
    });
  }
}

module.exports = UserController;