const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


morgan.token('person', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return '-'
});

app.use(morgan(':method :url :status :response-time ms - :person'));
app.use(express.json())
app.use(cors())
app.use(express.static('build'))



  app.get('/info', (request, response) => {
    Person.countDocuments({})
    .then(count => {
      const date = new Date();
      response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
    })
    .catch(error => next(error));
    })


 
  app.get('/api/persons', (request, response) => {
    person = Person.find({}).then(person =>{
      response.json(person)
    })
  })
  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person =>{
      if (person){
        response.json(person)
      }else {
        response.status(404).end()
      }
    }).catch(error => next(error))
    })
  

  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result =>{
      response.status(204).end()
    }).catch(error => next(error))
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }
    if (!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    }
    if (persons.find(person => person.name === body.name)) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person.save().then(savePerson =>{
      response.json(savePerson)
    })
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body =request.body
    const person ={
      name: body.name,
      number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, {new:true})
    .then(updatedPerson =>{
      response.json(updatedPerson)
    }).catch(error => next(error))
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError'){
      return response.status(400).send({error: 'malformatted id'})
    }
    next(error)
  }
  app.use(errorHandler)
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })