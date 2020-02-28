const Parcel = require('../../models').Parcel
const cleanup = require('../helpers/test_clear_database')

describe('Parcel Model', () => {
  beforeEach(() => {
    cleanup()
  })

  test('should has attributes', async () => {
    const parcel =  await Parcel.create({
      type: 'EXPRESS',
      weight: 2.4,
      volume: 0.52,
      recipient: 'Black Panther',
      address: '11 rue Marvel',
      city: 'Hollywood',
      zipcode: '00000',
    })

    expect(parcel.dataValues.type).toBe('EXPRESS')
    expect(parcel.dataValues.weight).toBe(2.4)
    expect(parcel.dataValues.volume).toBe(0.52)
    expect(parcel.dataValues.recipient).toBe('Black Panther')
    expect(parcel.dataValues.address).toBe('11 rue Marvel')
    expect(parcel.dataValues.city).toBe('Hollywood')
    expect(parcel.dataValues.zipcode).toBe('00000')
  })

  test('should only create a parcel with a type between EXPRESS and CLASSIC', async () => {

    try {
      await Parcel.create({
        type: 'TEST',
        weight: 2.4,
        volume: 0.52,
        recipient: 'Black Panther',
        address: '11 rue Marvel',
        city: 'Hollywood',
        zipcode: '00000',
      })
      } catch(error) {
      expect(error.name).toBe('SequelizeValidationError')
    }
  })
})
