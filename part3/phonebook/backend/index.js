import express from 'express'
import morgan from 'morgan'

const app = express()

morgan.token('json-content', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json-content'))
app.use(express.json())

let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(data)
})

app.get('/info', (req, res) => {
    const stat = `<p>Phonebook has info for ${data.length} people</p>`
    const time = new Date()
    res.send(stat + time)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = data.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const idx = data.findIndex(p => p.id === id)
    if (idx === -1) {
        res.status(404).end()
    } else {
        data.splice(idx, 1)
        res.status(204).end()
    }
})

app.post('/api/persons/', (req, res) => {
    let newPerson = req.body
    if (!newPerson) {
        res.status(415).send({ error: 'Content-Type must be application/json' })
    } else if (!newPerson.number) {
        res.status(400).json({ error: 'Invalid request: missing number' })
    } else if (!newPerson.name) {
        res.status(400).json({ error: 'Invalid request: missing name' })
    } else if (data.find(p => p.name === newPerson.name)) {
        res.status(409).json({ error: 'name must be unique' })
    } else {
        const maxId = data.length > 0 ? Math.max(...data.map(p => Number(p.id))) : 0
        newPerson = {...newPerson, id: String(maxId + 1)}
        data.push(newPerson)
        res.status(201).json(newPerson)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('\nExpress server running on PORT', PORT)
})