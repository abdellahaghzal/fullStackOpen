const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

console.log('Connecting to db...')
mongoose.connect(url, { family: 4 })
  .then(() => {console.log('Connected to db successfully!')})
  .catch((e) => {console.log('Failed to connect to db:', e.message)})

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'name is required!']
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d-\d/.test(v)
      },
      message: props => `${props.value} is not a valid number!`
    },
    minLength: 8,
    required: [true, 'number is required!']
  },
})

personSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)