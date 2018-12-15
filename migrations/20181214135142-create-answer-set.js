'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AnswerSets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      posAdjective: {
        type: Sequelize.STRING
      },
      negAdjective: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE AnswerSets CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;');
    })
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE AnswerSets CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;');
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AnswerSets')
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE AnswerSets CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT NULL;');
    })
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE AnswerSets CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;');
    });
  }
};