const { describe, test, beforeEach, after} = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')

const api = supertest(app)

const newUserShortUsername = {
  username: 'aa',
  password: 'password'
}

const newUserNoUsername = {
  password: 'password'
}

const newUserShortPass = {
  username: 'username',
  password: 'aa'
}

const newUserNoPass = {
  username: 'username'
}

const validUser = {
  username: 'username',
  password: 'password'
}

describe('users api tests', () => {
  beforeEach(() => {
    User.deleteMany({})
  })

  test('try to add User with short username', async () => {
    await api.post('/api/users').send(newUserShortUsername).expect(400)
  })
  test('try to add User with missing username', async () => {
    await api.post('/api/users').send(newUserNoUsername).expect(400)
  })
  test('try to add User with short password', async () => {
    await api.post('/api/users').send(newUserShortPass).expect(400)
  })
  test('try to add User with missing password', async () => {
    await api.post('/api/users').send(newUserNoPass).expect(400)
  })
  test('try inserting duplicate user', async () => {
    await api.post('/api/users').send(validUser).expect(201)
    await api.post('/api/users').send(validUser).expect(400)
  })
})

after(() => {
  mongoose.connection.close()
})