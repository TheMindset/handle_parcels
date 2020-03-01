const app = require('../../../../app')
const request = require('supertest')(app)
const cleanup = require('../../../helpers/test_clear_database')
const bcrypt = require('bcryptjs')
const User = require('../../../../models').User

describe('User endpoints', () => {

  const _hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)
    return hashedPassword
  }
  
  beforeAll(async () => {
    await cleanup()
    return await User.create({
      name: 'Melrose Place',
      email: 'melrose@place.com',
      password: await _hashedPassword('123456')
    })
  })

  test('should register a new user', async () => {
    const response = await request.post('/api/v1/users/register')
    .send({
      name: 'Nakia',
      email: 'nakia@panther.com',
      password: 'nakia1234'
    })
    expect(response.statusCode).toBe(200)

    expect(Object.keys(response.body)).toContain('id')
    expect(response.body.name).toBe('Nakia')
    expect(response.body.email).toBe('nakia@panther.com')
  })

  test('should login a registered user', async () => {
    const response = await request.post('/api/v1/users/login')
    .send({
      email: 'melrose@place.com',
      password: '123456'
    })
    expect(response.statusCode).toBe(200)

    expect(Object.keys(response.headers)).toContain('auth-token')
    expect(Object.keys(response.body)).toContain('token')
    expect(response.body.success).toBe('Logged in!')
  })

  test('should return a error if the email is not in DB', async () => {
    const response = await request.post('/api/v1/users/login')
    .send({
      email: 'non-exixtent@email.com',
      password: '123456'
    })
    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBe('Email not found')
  })

  test('should return a error if the wrong password is sent', async () => {
    const response = await request.post('/api/v1/users/login')
    .send({
      email: 'melrose@place.com',
      password: 'wrongPassword'
    })
    expect(response.statusCode).toBe(401)
    expect(response.body.error).toBe('Invalid Password')
  })
})
