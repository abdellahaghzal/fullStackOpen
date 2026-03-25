require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 3003
const MONGODB_URL = !NODE_ENV || NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL
const SECRET = process.env.SECRET

module.exports = {PORT, MONGODB_URL, SECRET, NODE_ENV}