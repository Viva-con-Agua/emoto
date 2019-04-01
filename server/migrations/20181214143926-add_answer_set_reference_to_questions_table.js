'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Questions",
      "answerSetId",
      {
        type: Sequelize.INTEGER
      }
    )
    .then(function(){
      return queryInterface.addConstraint('Questions', ['answerSetId'], {
        type: 'foreign key',
        name: 'question_fkey_constraint_answer_set_id',
        references: { //Required field
          table: 'AnswerSets',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Questions', 'question_fkey_constraint_answer_set_id')
    .then(function(){
      return queryInterface.removeColumn('Questions', 'answerSetId');
    });
  }
};
