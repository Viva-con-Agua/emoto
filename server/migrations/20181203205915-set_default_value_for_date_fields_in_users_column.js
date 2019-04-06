'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('ALTER TABLE Users CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;')
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE Users CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;');
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('ALTER TABLE Users CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT NULL;')
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE Users CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT NULL;');
    });
  }
};
