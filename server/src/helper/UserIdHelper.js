'use strict';

const UserController = require('./../controller/UserController');

class UserIdHelper{
  static translateId(userId, crewId){
    return UserController.findOrCreate(userId, crewId)
    .then(function(user){
      return user.id;
    });
  }
}

module.exports = UserIdHelper;