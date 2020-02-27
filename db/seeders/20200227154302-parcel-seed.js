'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parcels',
      [
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Parcels', null, {})
  }
};
