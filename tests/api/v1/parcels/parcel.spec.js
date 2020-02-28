const app = require('../../../../app')
const faker = require('faker')
const request = require('supertest')(app)
const cleanup = require('../../../helpers/test_clear_database')
const Parcel = require('../../../../models').Parcel

describe('Parcel endpoints', () => {
  
  beforeAll(async () => {
    await cleanup()
    await Parcel.bulkCreate([
      {
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
        type: 'EXPRESS',
        weight: 2.9,
        volume: 0.4,
        recipient: 'Marilyn Monroe',
        address: '11 rue marilyn monroe',
        city: 'Monroe City',
        zipcode: '00000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'CLASSIC',
        weight: 1.5,
        volume: 0.58,
        recipient: faker.name.findName(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        zipcode: faker.address.zipCode(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  })

  test('should return all parcels', async () => {
    const response = await request.get('/api/v1/parcels')
    expect(response.statusCode).toBe(200)
    expect(response.body.data.length).toBe(3)

    expect(Object.keys(response.body.data[0])).toContain('id')
    expect(Object.keys(response.body.data[0])).toContain('type')
    expect(Object.keys(response.body.data[0])).toContain('weight')
    expect(Object.keys(response.body.data[0])).toContain('volume')
    expect(Object.keys(response.body.data[0])).toContain('recipient')
    expect(Object.keys(response.body.data[0])).toContain('address')
    expect(Object.keys(response.body.data[0])).toContain('city')
    expect(Object.keys(response.body.data[0])).toContain('zipcode')
  })

  test('should retourn the parcel specified by ID', async () => {
    const response = await request.get('/api/v1/parcels/2')

    expect(response.statusCode).toBe(200)

    expect(response.body.data.id).toBe(2)
    expect(response.body.data.type).toBe('EXPRESS')
    expect(response.body.data.weight).toBe(2.9)
    expect(response.body.data.volume).toBe(0.4)
    expect(response.body.data.recipient).toBe('Marilyn Monroe')
    expect(response.body.data.address).toBe('11 rue marilyn monroe')
    expect(response.body.data.city).toBe('Monroe City')
    expect(response.body.data.zipcode).toBe('00000')
  })

  test('should create a new parcel', async () => {
    const response = await request.post('/api/v1/parcels')
    .send({
      type: 'EXPRESS',
      weight: 2.7,
      volume: 0.45,
      recipient: 'Captain America',
      address: '11 rue marvel',
      city: 'Hollywood',
      zipcode: '00000',
    })
    expect(response.statusCode).toBe(200)

    expect(response.body.type).toBe('EXPRESS')
    expect(response.body.weight).toBe(2.7)
    expect(response.body.volume).toBe(0.45)
    expect(response.body.recipient).toBe('Captain America')
    expect(response.body.address).toBe('11 rue marvel')
    expect(response.body.city).toBe('Hollywood')
    expect(response.body.zipcode).toBe('00000')
  })

  test('should update a parcel with the specified ID', async () => {
    const response = await request.patch('/api/v1/parcels/3')
    .send({
      recipient: 'Mr & Miss Smith'
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.recipient).toBe('Mr & Miss Smith')
  })
  
  test('should only update a parcel with an ID in DB ', async () => {
    const response = await request.patch('/api/v1/parcels/10')

    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBe("The ID specified doesn't exists")
  })
  
  test('should delete a parcel with the specified ID', async () => {
    const response = await request.delete('/api/v1/parcels/3')

    expect(response.statusCode).toBe(204)
  })

  test('should only delete a parcel with an IDin DB', async () => {
    const response = await request.delete('/api/v1/parcels/8')
    expect(response.statusCode).toBe(401)

    expect(response.body.error).toBe("The ID specified doesn't exists")
  })
})