import Note from './Note'


const Persons = ({ personsToShow }) => {
    return (
      <div>
        {personsToShow.map((person) => (
          <Note key={person.name} note={person} />
        ))}
      </div>
    )
  }
  
  export default Persons;