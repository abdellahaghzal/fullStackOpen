const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware')
const morgan = require('morgan')

const app = express()

logger.info("Connecting to mongodb...")
mongoose.connect(config.MONGODB_URL, { family: 4 })
  .then(() => {logger.info('Connected to mongodb successfully!')})
  .catch(() => {
    logger.error('Error connecting to mongodb :(')
    process.exit(1)
  })

app.use(express.json())
if (process.env.NODE_ENV != "test") {
  app.use(morgan('tiny'))
}
app.use(tokenExtractor)

app.use('/api/blog', userExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app