import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import {useEffect, useState} from 'react'
import notesService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [persons, setPersons] = useState([]) 
  useEffect(() => {
    notesService
      .getAll()
      .then(response => {
        setNotes(response)
        setPersons(response)
      })
  }, [])
  console.log('render', notes.length, 'notes')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

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