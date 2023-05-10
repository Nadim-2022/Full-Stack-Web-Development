const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <div key={index}>
          <Part part={part.name} exercises={part.exercises} />
        </div>
      ))}
    </div>
  );
};

const Total = (props) => {
  const sum = props.parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <div>
      <p>Number of exercises: {sum}</p>
    </div>
  );
};
const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = {course} />
      <Content parts = {parts} />
      <Total parts = {parts} />
    </div>
  )
}

export default App