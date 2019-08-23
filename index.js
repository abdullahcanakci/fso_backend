require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const People = require('./models/people')

const app = express()

app.use(express.static('build'))
app.use(bodyParser.json())

app.get('/info', (req, res) => {
  People
    .countDocuments()
    .exec((err, count) => {
      if (err) {
        res.send(err)
        return
      }
      const time = new Date()
      res.send(`<p>Phonebook has ${count} people</p><p>${time}</p>`)
    })
})

app.get('/api/persons', (req, res) => {
  People
    .find({})
    .then(people => {
      res.json(people.map(person => person.toJSON()))
    })
    .catch(error => {
      console.log('Error while retrieving people', error)
    })
})

app.get('/api/persons/:id', (req, res) => {
  People
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => console.log(error))
})

app.delete('/api/persons/:id', (req, res) => {
  People
    .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => console.log(error))
})

morgan.token('body', (req, res) => { return JSON.stringify(req.body) })

const loggerFormat = ':method :url :status :res[content-length] - :response-time[3] :body'

app.use(morgan(loggerFormat))

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name && !body.number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }
  const person = new People({
    date: new Date(),
    name: body.name,
    number: body.number
  })
  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON()).end()
        .catch(error => {
          console.log('error while posting new entry to the database', error)
        })
    })
    .catch(error => next(error))

  res.status(201).json(person)
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  People
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
