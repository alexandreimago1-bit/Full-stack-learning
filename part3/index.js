require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')
const mongoose = require('./mongo')
const connection = require('./mongo')


app.use(express.json())
morgan.token('body', (req,res) => {
    return JSON.stringify(req.body)
})

const cors = require('cors')
app.use(cors())

app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))


app.get('/info',(request,response) => {
    const now = new Date()
    const formattedTime = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    response.send(
        `<div>
            <p>Phonebook has info for ${Person.length} people</p>
            <p><time datetime="${now.toISOString()}">${formattedTime}</time>.</p>

        </div>`)
    
})

app.get('/api/persons',(request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
})

app.get('/api/persons/:id', (request,response) => {
    Person
    .findById(request.params.id)
    .then(persons => {
        response.json(persons)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person
    .findByIdAndDelete(request.params.id)
    .then(persons => {
        console.log(persons)
        response.status(204).end()
    })
    
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number){
        return response.status(400).json({ error: 'Content missing.' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
    .save()
    .then(savedPerson => {
        response.json(savedPerson)
    })

})

const PORT = process.env.PORT || 4000
connection
    .then(() => {
        console.log('connected to MongoDB')

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch(error => {
        console.error('error connecting to MongoDB', error.message)
    })