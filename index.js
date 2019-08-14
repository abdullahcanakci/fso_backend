const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

let persons = [
]

const generateId = () => {
    return Math.floor((Math.random() * 1000000))
}

app.get('/info', (req, res) => {
    const count = persons.length
    const time = new Date()
    res.send(`<p>Phonebook has ${count} people</p><p>${time}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    console.log('Deleting id '+ id)
    res.status(200).end()
})

morgan.token('body', (req, res) => {return JSON.stringify(req.body)})

let loggerFormat = ':method :url :status :res[content-length] - :response-time[3] :body'

app.use(morgan(loggerFormat))

app.post('/api/persons', (req, res) => {
    const body = req.body

    if(!body.name && !body.number) {
        return res.status(400).json({error: 'name or number is missing'})
    }
    if(persons.find(p => p.name === body.name)){
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        id: generateId(),
        date: new Date(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
    res.status(201).json(person)
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "unknown endpoint"})
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})