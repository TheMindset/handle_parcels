'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Parcels',
      'price',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Parcels',
      'price'
    );
  }
};