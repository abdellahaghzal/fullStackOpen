const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).json({ error: 'password is missing' })
  } else if (req.body.password.length < 3) {
    return res.status(400).json({ error: 'password must be at least 3 characters' })
  }
  const saltRounds = 10
  req.body.password = await bcrypt.hash(req.body.password, saltRounds)
  const newUser = new User(req.body)
  try {
    const result = await newUser.save()
    res.status(201).json(result)
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter