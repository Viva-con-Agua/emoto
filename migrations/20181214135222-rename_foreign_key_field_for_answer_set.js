'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE `Answers` CHANGE COLUMN `set` answerSetId int(11)")
    .then(function(){
      return queryInterface.addConstraint('Answers', ['answerSetId'], {
        type: 'foreign key',
        name: 'answers_fkey_constraint_answer_set_id',
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
    return queryInterface.removeConstraint('Answers', 'answers_fkey_constraint_answer_set_id')
    .then(function(){
      return queryInterface.sequelize.query('ALTER TABLE `Answers` CHANGE COLUMN answerSetId `set` int(11)');  
    });
  }
};
