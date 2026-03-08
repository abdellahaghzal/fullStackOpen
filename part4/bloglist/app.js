const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')

const app = express()

logger.info("Connecting to mongodb...")
mongoose.connect(config.MONGODB_URL, { family: 4 })
  .then(() => {logger.info('Connected to mongodb successfully!')})
  .catch(() => {
    logger.error('Error connecting to mongodb :(')
    process.exit(1)
  })

  app.use(express.json())
app.use('/api/blog', blogRouter)

module.exports = app