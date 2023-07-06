const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

test('Creating a new user with invalid username and password returns 400', async () => {
    const newUser = {
      username: 'gu',
      password: 'nun'
    }
  
    const response = await api.post('/api/users').send(newUser)
  
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Username must be at least 3 characters long')
  })
  

test('Creating a new user with a non-unique username returns 400', async () => {
  const existingUser = new User({
    username: 'habanero',
    password: 'password'
  })
  await existingUser.save()

  const newUser = {
    username: 'habanero',
    password: 'password'
  }

  const response = await api.post('/api/users').send(newUser)

  expect(response.status).toBe(400)
  expect(response.body.error).toBe('Username must be unique')
})

afterAll(async () => {
  await mongoose.connection.close()
})
