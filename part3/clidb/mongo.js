const mongoose = require('mongoose')

const argc = process.argv.length

if (argc !== 3 && argc !== 5) {
  console.log('Usage:\n\t')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://aghzal:${password}@fullstackopen.vnn3l04.mongodb.net/?appName=fullStackOpen`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 }).catch((e) => {
    console.log("Error connecting to database", e.message)
    process.exit(1)
})

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (argc === 3) {
    Person.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
} else if (argc === 5) {
    const name = process.argv[3]
    const num = process.argv[4]
    const newPerson = new Person({
        name: name,
        number: num
    })
    newPerson.save().then(result => {
        console.log(`added ${name} number ${num} to phonebook`)
        mongoose.connection.close()
    })
}