'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[
      {
        "userDropsId": "972b11d0-f73d-11e8-8eb2-f2801f1b9fd1",
        "crewDropsId": "972b1478-f73d-11e8-8eb2-f2801f1b9fd1"
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
