const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username: username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'wrong credentials' })
  }
  const userForToken = {
    username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)

  res.json({ token, username })
})

module.exports = loginRouter