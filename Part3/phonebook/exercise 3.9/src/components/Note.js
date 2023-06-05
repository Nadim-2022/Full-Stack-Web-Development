const Note = ({ note, handleDelet }) => {
    console.log(note)
    return (
      <p>{note.name} {note.number} <button onClick={() => handleDelet(note.id)}>Delete</button></p>
    )
  }
  
  export default Note