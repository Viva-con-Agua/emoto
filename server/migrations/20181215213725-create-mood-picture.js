'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MoodPictures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
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
      return queryInterface.sequelize.query('ALTER TABLE MoodPictures CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;');
    })
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE MoodPictures CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;');
    })
    .then(function(){
      return queryInterface.addConstraint('MoodPictures', ['userId'], {
        type: 'foreign key',
        name: 'moodPicute_fkey_constraint_user_id',
        references: { //Required field
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MoodPictures')
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE MoodPictures CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT NULL;');
    })
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE MoodPictures CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;');
    })
    .then(function(){
      return queryInterface.removeConstraint('Moods', 'mood_fkey_constraint_user_id');
    });
  }
};