require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
morgan.token('json-content', (req, res, next) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json-content'))

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

app.get('/info', (req, res, next) => {
    Person.find({}).then(people => {
        const stat = `<p>Phonebook has info for ${people.length} people</p>`
        const time = new Date()
        res.send(stat + time)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(person => {
            if (!person) {
                res.status(404).end()
            } else {
                res.status(204).end()
            }
        })
        .catch(err => next(err))
})

app.post('/api/persons/', (req, res, next) => {
    let newPersonData = req.body
    if (!newPersonData) {
        res.status(415).json({ error: 'Content-Type must be application/json' })
    } else if (!newPersonData.number) {
        res.status(400).json({ error: 'Invalid request: missing number' })
    } else if (!newPersonData.name) {
        res.status(400).json({ error: 'Invalid request: missing name' })
    } else {
        Person.findOne({ name: newPersonData.name })
            .then(person => {
                if (person) {
                    res.status(409).json({ error: 'name must be unique' })
                } else {
                    const newPerson = new Person({
                        name: newPersonData.name,
                        number: newPersonData.number
                    })
                    newPerson.save()
                        .then((savedPerson) => {
                            res.status(201).json(savedPerson)
                        })
                        .catch(err => next(err))
                }
            })
            .catch(err => next(err))
    }
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const data = req.body
    Person.findByIdAndUpdate(id, data, { new: true })
        .then(updatedPerson => {
            if (updatedPerson) {
                res.json(updatedPerson)
            } else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
    console.error(err.message)
    return (res.status(500).json({ error: err.message }))
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Express server running on PORT', PORT)
})