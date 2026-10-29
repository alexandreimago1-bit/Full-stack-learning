const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person