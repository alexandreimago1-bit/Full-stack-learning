require('dotenv').config()
    
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//     name: 'Alex Andrei Mago',
//     number: '0915-068-8579'
// })

// person.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (password && name && number){
    const person = new Person ({ name,number })
        person.save().then(result => {
            console.log(`added ${name} number: ${number} to phonebook`)
            mongoose.connection.close()
        })
}else if (password){
    Person
    .find({})
    .then(persons => {
        console.log('Phonebook:')
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}else {
    console.log('Add a name and number please.')
}





