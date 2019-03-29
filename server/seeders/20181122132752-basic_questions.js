'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        "question": "Wie ist deine persönliche Stimmung in Bezug auf VcA?"
      },
      {
        "question": "Wie fandest du die letzte Aktion, an der du teilgenommen hast?"
      },
      {
        "question": "Wie ist deiner Meinung nach die aktuelle Stimmung in deiner Crew?"
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
