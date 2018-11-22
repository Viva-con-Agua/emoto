'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Answers', [
      {
        "answer": "sehr negativ",
        "set": 0,
        "weight": -3
      },
      {
        "answer": "negativ",
        "set": 0,
        "weight": -2
      },
      {
        "answer": "eher negativ", 
        "set": 0,
        "weight": -1
      },
      {
        "answer": "eher positiv", 
        "set": 0,
        "weight": 1
      },
      {
        "answer": "positiv",
        "set": 0,
        "weight": 2
      },
      {
        "answer": "sehr positiv",
        "set": 0,
        "weight": 3
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Answers', null, {});
  }
};
