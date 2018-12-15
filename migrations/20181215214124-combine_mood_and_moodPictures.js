'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Moods', 'mood_fkey_constraint_user_id')
    .then(function(){
      return queryInterface.removeColumn('Moods', 'userId');
    })
    .then(function(){
      return queryInterface.removeColumn('Moods', 'date');
    })
    .then(function(){
      return queryInterface.addColumn(
        'Moods',
        'moodPictureId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      );
    })
    .then(function(){
      return queryInterface.addConstraint('Moods', ['moodPictureId'], {
        type: 'foreign key',
        name: 'mood_fkey_constraint_mood_picture_id',
        references: { //Required field
          table: 'MoodPictures',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Moods',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    )
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
      return queryInterface.removeConstraint('Moods', 'mood_fkey_constraint_mood_picture_id')
    })
    .then(function(){
      return queryInterface.removeColumn('Moods', 'moodPictureId');
    })
    .then(function(){
      return queryInterface.addColumn(
        'Moods',
        'date',
        {
          type: Sequelize.DATE,
          allowNull: false
        }
      );
    });
  }
};
