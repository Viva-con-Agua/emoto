'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Moods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER
      },
      questionId: {
        type: Sequelize.INTEGER
      },
      answerId: {
        type: Sequelize.INTEGER
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
      return queryInterface.sequelize.query('ALTER TABLE Moods CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;');
    })
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE Moods CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;');
    })
    .then(function(){
      return queryInterface.addConstraint('Moods', ['userId'], {
        type: 'foreign key',
        name: 'mood_fkey_constraint_user_id',
        references: { //Required field
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    })
    .then(function(){
      return queryInterface.addConstraint('Moods', ['answerId'], {
        type: 'foreign key',
        name: 'mood_fkey_constraint_answer_id',
        references: { //Required field
          table: 'Answers',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    })
    .then(function(){
      return queryInterface.addConstraint('Moods', ['questionId'], {
        type: 'foreign key',
        name: 'mood_fkey_constraint_question_id',
        references: { //Required field
          table: 'Questions',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Moods')
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE Moods CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT NULL;');
    })
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE Moods CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT NULL;');
    })
    .then(function(){
      return queryInterface.removeConstraint('Moods', 'mood_fkey_constraint_user_id');
    })
    .then(function(){
      return queryInterface.removeConstraint('Moods', 'mood_fkey_constraint_answer_id');
    })
    .then(function(){
      return queryInterface.removeConstraint('Moods', 'mood_fkey_constraint_question_id');
    });
  }
};