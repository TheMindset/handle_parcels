const app = require('../../../../app')
const request = require('supertest')(app)
const faker = require('faker')
const bcrypt = require('bcryptjs')

const cleanup = require('../../../helpers/test_clear_database')
const User = require('../../../../models').User
const Parcel = require('../../../../models').Parcel

describe('Authentication', () => {

  const _hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)
    return hashedPassword
  }
  
  beforeAll(async () => {
    await cleanup()

    await User.create({
      name: 'Melrose Place',
      email: 'melrose@place.com',
      password: await _hashedPassword('123456')
    })

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
      }
    ])
  })

  test('should return error if the users are not logged in', async () => {
    const response = await request.get('/api/v1/parcels/1/price')

    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBe('Access denied you must login before')
  })

  test('should return a error when not logged user want create a parcel', async () => {
    const response = await request.post('/api/v1/parcels')
    .send({
      type: 'EXPRESS',
      weight: 4.1,
      volume: 0.45,
      recipient: 'Captain America',
      address: '11 rue marvel',
      city: 'Hollywood',
      zipcode: '00000',
    })
    expect(response.statusCode).toBe(401)

    expect(response.body.error).toBe('Access denied you must login before')
  })

  test('should update a parcel with the specified ID', async () => {
    const response = await request.patch('/api/v1/parcels/3')
    .send({
      recipient: 'Mr & Miss Smith'
    })

    expect(response.statusCode).toBe(401)

    expect(response.body.error).toBe('Access denied you must login before')
  })
  
  test('should only update a parcel with an ID in DB ', async () => {
    const response = await request.patch('/api/v1/parcels/10')

    expect(response.statusCode).toBe(401)

    expect(response.body.error).toBe('Access denied you must login before')
  })
  
  test('should delete a parcel with the specified ID', async () => {
    const response = await request.delete('/api/v1/parcels/3')

    expect(response.statusCode).toBe(401)

    expect(response.body.error).toBe('Access denied you must login before')
  })

  test('should estimate price of the specified parcel', async () => {
    const response = await request.get('/api/v1/parcels/2/price')

    expect(response.statusCode).toBe(401)

    expect(response.body.error).toBe('Access denied you must login before')
  })

})
