const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('body', (req,res) => {
    return JSON.stringify(req.body)
})

const cors = require('cors')
app.use(cors())

app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))
let persons = [
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

app.get('/',(request, response) => {
    response.send('<h1>THIS IS MY APP!</h1>')
})

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
            <p>Phonebook has info for ${persons.length} people</p>
            <p><time datetime="${now.toISOString()}">${formattedTime}</time>.</p>

        </div>`)
    console.log(Success)
})

app.get('/api/persons',(request, response) => {
    response.json(persons)
    console.log(persons)
})

app.get('/api/persons/:id', (request,response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    console.log(person)
    if (person){
        response.json(person)
    }else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id )
    console.log(persons)
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0 
        ? Math.max(...persons.map(p => Number(p.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
    const body = request.body 
        if (!body.name || !body.number){
        return response.status(400).json({
            error : 'content missing'
        })
    }

    const personExists = persons.find(person => person.name.toLowerCase().trim() === body.name.toLowerCase().trim())

        if (personExists){
                return response.status(400).json({
                    error: 'Name must be Unique'
                })
            }

    const person = {
        id: generateId(),
        name : body.name,
        number: body.number
    }

    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})