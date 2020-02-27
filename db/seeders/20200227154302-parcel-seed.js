const faker = require('faker')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parcels',
      [
        {
          id: 1,
          type: 'CLASSIC',
          weight: 2.5,
          volume: 0.57,
          recipient: faker.name.findName(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          zipcode: faker.address.zipCode(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          type: 'EXPRESS',
          weight: 2.9,
          volume: 0.4,
          recipient: faker.name.findName(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          zipcode: faker.address.zipCode(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          type: 'CLASSIC',
          weight: 1.5,
          volume: 0.58,
          recipient: faker.name.findName(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          zipcode: faker.address.zipCode(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          type: 'EXPRESS',
          weight: 1.7,
          volume: 10.5,
          recipient: faker.name.findName(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          zipcode: faker.address.zipCode(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          type: 'CLASSIC',
          weight: 4.6,
          volume: 14.5,
          recipient: faker.name.findName(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          zipcode: faker.address.zipCode(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          type: 'EXPRESS',
          weight: 4.9,
          volume: 0.76,
          recipient: faker.name.findName(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          zipcode: faker.address.zipCode(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Parcels', null, {})
  }
};
