import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import {useEffect, useState} from 'react'
import notesService from './services/notes'
import { ErrorNotification, Notification } from './components/Notification'
const App = () => {
  const [notes, setNotes] = useState([])
  const [persons, setPersons] = useState([]) 
 
  console.log('render', notes.length, 'notes')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errornotification, seterrorNotification] = useState(null)
  useEffect(() => {
    notesService
      .getAll()
      .then(response => {
        setNotes(response)
        setPersons(response)
      })
  }, [])

  const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  
  const showNotification =(message) =>{
    setNotification({message})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  const showErrorNotification =(message) =>{
    seterrorNotification({message})
    setTimeout(() => {
      seterrorNotification(null)
    }, 5000)
  }

  const addPerson  =(event) =>{
    event.preventDefault()
    console.log('button clicked', event.target)
    
    if (persons.some((person)=> person.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find((person) => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        notesService.update(person.id, changedPerson).then(response => {
          setPersons(persons.map((person) => person.id !== changedPerson.id ? person : response))
          setNewName('')
          setNewNumber('')
          showNotification(`Changed ${changedPerson.name}'s number`)
        }).catch(error => {
          console.log(error)
          showErrorNotification(`Information of ${changedPerson.name} has already been removed from server`)
          setPersons(persons.filter((person) => person.id !== changedPerson.id))
        })

      }
    }
    else{
      const personObject ={
        name: newName,
        number: newNumber,
      }
      notesService.create(personObject).then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
      showNotification(`Added ${personObject.name}`)
      })
    }
   
  }

  const handleDelet = (id) => {
    if (window.confirm(`Delete ${persons.find((person) => person.id === id).name}?`)) {
      notesService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
    }
  }

  const handlePersonChange =(event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange =(event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange =(event) =>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification message={notification} />}
      {errornotification && <ErrorNotification message={errornotification} />}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelet ={handleDelet} />
    </div>
  )
}

export default App