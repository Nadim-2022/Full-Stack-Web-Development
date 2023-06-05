import Note from './components/Note'
import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson  =(event) =>{
    event.preventDefault()
    console.log('button clicked', event.target)
    
    if (persons.some((person)=> person.name === newName)){
      alert(`${newName} is already added to phonebook`)
     console.log('Name is already in phonebook')
    }
    else{
      const personObject ={
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange = {handlePersonChange}/>
        </div>
        <div>number: <input value={newNumber} onChange ={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(persons => <Note key={persons.name} note={persons} />)}
      </div>
      
    </div>
  )
}

export default App