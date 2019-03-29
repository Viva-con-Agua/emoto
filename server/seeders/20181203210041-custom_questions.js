'use strict';

const models = require('./../server/models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.User.findAll()
    .then(function(users){
      return queryInterface.bulkInsert('Questions', [
        {
          "question": "Custom Question 1",
          "userId": users[0].dataValues.id
        },
        {
          "question": "Custom Question 2",
          "userId": users[0].dataValues.id
        }
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
