'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        "question": "Wie ist deine persönliche Stimmung in Bezug auf VcA?",
        "answerSetId": 1
      },
      {
        "question": "Wie fandest du die letzte Aktion, an der du teilgenommen hast?",
        "answerSetId": 1
      },
      {
        "question": "Wie ist deiner Meinung nach die aktuelle Stimmung in deiner Crew?",
        "answerSetId": 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
