const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
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
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course = {course} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default App