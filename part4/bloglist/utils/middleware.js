const logger = require('./logger')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const User = require('../models/user')

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)
  if (err.name === 'ValidationError') {
    if (err.message.includes('username')) {
      return res.status(400).json({ error: 'username must be at least 3 characters long' })
    } else if (err.message.includes('title')) {
      return res.status(400).json({ error: 'title is missing' })
    } else if (err.message.includes('url')) {
      return res.status(400).json({ error: 'url is missing' })
    }
  } else if (err.name === 'MongoServerError') {
    if (err.message.includes('E11000 duplicate key error')) {
      if (err.message.includes('username')) {
        return res.status(400).json({ error: 'username already exists' })
      }
    }
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: 'token invalid' })
  }
  next(err)
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  } else {
    req.token = null
  }
  next()
}

const userExtractor = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    req.user = await User.findById(decodedToken.id)
    next()
  } catch (e) {
    res.status(401).json({ error: 'token invalid' }) 
  }
}

module.exports = { errorHandler, tokenExtractor, userExtractor }