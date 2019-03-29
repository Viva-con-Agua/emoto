'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Answers',
      'set',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    )
    .then(function(){
      return queryInterface.addColumn(
        'Answers',
        'weight',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Answers', 'set').then(function () {
      return queryInterface.removeColumn('Answers', 'weight');
    });
  }
};
