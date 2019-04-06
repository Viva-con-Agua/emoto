'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Questions',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      }
    ).then(function(){
      return queryInterface.addConstraint('Questions', ['userId'], {
        type: 'foreign key',
        name: 'question_fkey_constraint_user_id',
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
    return queryInterface.removeConstraint('Questions', 'question_fkey_constraint_user_id')
    .then(function(){
      return queryInterface.removeColumn('Questions', 'userId');
    });
  }
};
