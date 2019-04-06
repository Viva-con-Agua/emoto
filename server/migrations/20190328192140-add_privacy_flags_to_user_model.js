'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'statisticalAnalysis',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    )
    .then(function(){
      return queryInterface.addColumn(
        'Users',
        'contentAnalysis',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'statisticalAnalysis')
    .then(function(){
      return queryInterface.removeColumn('Users', 'contentAnalysis');
    });
  }
};
