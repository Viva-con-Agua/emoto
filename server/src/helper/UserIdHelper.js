'use strict';

const UserController = require('./../controller/UserController');

class UserIdHelper{
  static translateId(userId, crewId){
    return UserController.findByDropsId(userId)
    .then(function(user){
      if(user === null) throw new Error('user does not exsist');
      
      if(user.crewDropsId !== crewId){
        return user.update({
          crewDropsId: crewId
        });
      }else{return Promise.resolve(user);}
    })
    .then(function(user){
      return {id: user.id, active: user.active};
    });
  }

  
}

module.exports = UserIdHelper;