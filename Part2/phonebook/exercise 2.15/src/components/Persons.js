import Note from './Note'


const Persons = ({ personsToShow, handleDelet }) => {
    return (
      <div>
        {personsToShow.map((person) => (
          <Note key={person.name} note={person} handleDelet = {handleDelet}  />
        ))}
      </div>
    )
  }
  
  export default Persons;