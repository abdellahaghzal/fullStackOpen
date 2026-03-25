const Blog = require('../models/blog')
const User = require('../models/user')
const testRouter = require('express').Router()

testRouter.delete('/reset', async (req, res) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  res.status(204).end()
})

module.exports = testRouter