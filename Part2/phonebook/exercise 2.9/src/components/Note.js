const Note = ({ note }) => {
    console.log(note)
    return (
      <p>{note.name} {note.number}</p>
    )
  }
  
  export default Note