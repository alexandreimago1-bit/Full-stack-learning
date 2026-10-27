import { useState,useEffect } from 'react'
import personsService from './service/service'
import Notification  from './component/Notification'

const HeaderDisplay = ({ text }) => {
  return(
    <h1>{text}</h1>
  )
}

const Input = ({ value, onChange }) => (
  <div>
    <input value={value} onChange={onChange} />
  </div>
)

const TextDisplay = ({text}) => {
  return(<p>{text}</p>)
}

const Button = ({ type, text })=>{
  return(<div>
    <button type={type}>{text}</button>
  </div>)
}

const PersonForm = ({onSubmit, newNameValue, newNameOnChange, newNumberValue, newNumberOnChange}) =>{
  return(
    <form onSubmit={onSubmit}>
      <TextDisplay text='Name:'/>
      <Input value={newNameValue} onChange={newNameOnChange}/>
      <TextDisplay text='Number:'/>
      <Input value={newNumberValue} onChange={newNumberOnChange}/>
      <Button type='submit' text='add'/>
    </form>
  )
}
const Person = ({person, handleDelete}) =>{
  return(
    <div>
      <p>{person.name} - {person.number}</p>
      <button onClick = {() => handleDelete(person.id) }>delete</button>
    </div>  
  )
}

const Persons = ({personsToShow, handleDelete}) => {
  return(
    <div>
        {personsToShow.map(person => 
        <Person person={person} key={person.id} handleDelete={handleDelete}/>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const  [filterSearch, setFilterSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
      personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    personsService
      .getAll()
      .then(data =>{ 
        const cleanName = newName.trim().toLowerCase()
        const nameExists = data.find(person => person.name.trim().toLowerCase() === cleanName) 
          console.log('Fresh server data:', data)
          console.log('Name found:', nameExists)
        if (nameExists){
          const proceed = window.confirm(`${nameExists.name} is already in the phonebook, do you want to replace the old number with a new one?`)
          if (proceed){
            const personObject = {
            name: newName.trim(),
            number: newNumber.trim(),
            }
            personsService
              .update(nameExists.id,personObject)
              .then(newPerson => {
                  setPersons(prev => prev.map(p => p.id === newPerson.id ? newPerson : p))
                  setMessage(`Updated ${newPerson.name}'s number`)
                  setTimeout(() => {setMessage(null)},5000)
                  console.log('promise fulfilled', newPerson)
              })
              .catch(error => {
                setMessage(`${newName} doesn't Exist`,error)
              })
          }
        }else{
            const personObject = {
            name: newName.trim(),
            number: newNumber.trim(),
            }
            personsService
              .create(personObject)
              .then(newPerson => {
                  setPersons(persons.concat(newPerson))
                  setMessage(`Added ${newPerson.name}`)
                  setTimeout(() => {
                    setMessage(null)
                  }, 5000)
                  console.log('promise fulfilled', newPerson)
              })
    }
  })

    setNewName('')
    setNewNumber('')}
  

  const handleDelete = (id) => {
      personsService
      .deletePerson(id)
      .then(() =>{
      return setPersons(prevPersons => prevPersons.filter(person => person.id !== id)) })
      .catch (error => {
        alert(`Failed to delete person: ${error.message}`)})
      
    }
  
  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilterSearch(event.target.value)
  }

  const personsToShow = persons.filter(person => {
    return person.name.toLowerCase().includes(filterSearch.toLowerCase())
  })

  return(
    <div>
      <HeaderDisplay text ='Phonebook' />
      <div>
        <Notification message={message} />
        <TextDisplay text='filter shown with:'/> 
        <Input value={filterSearch} onChange={handleFilter} />
      </div>
      <HeaderDisplay text ='Add a Person' />
      <PersonForm 
      onSubmit={addPerson} 
      newNameValue={newName} 
      newNameOnChange={handleNewName}  
      newNumberValue={newNumber} 
      newNumberOnChange={handleNewNumber}/>
      <HeaderDisplay text ='Numbers' />
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}
export default App