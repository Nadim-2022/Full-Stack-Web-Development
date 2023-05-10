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
      <Part1 part1 = {props.part1} exercises1 = {props.exercises1} />
      <Part2 part2 = {props.part2} exercises2 = {props.exercises2} />
      <Part3 part3 = {props.part3} exercises3 = {props.exercises3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}
const Part1 = (props) => {
  return (
    <div>
      <p>
        {props.part1} {props.exercises1}
      </p>
    </div>
  )
}

const Part2 = (props) => {
  return (
    <div>
      <p>
        {props.part2} {props.exercises2}
      </p>
    </div>
  )
}

const Part3 = (props) => {
  return (
    <div>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course} />
      <Content part1 = {part1.name} part2 = {part2.name} part3 = {part3.name} exercises1 = {part1.exercises} exercises2 = {part2.exercises} exercises3 = {part3.exercises} />
      <Total exercises1 = {part1.exercises} exercises2 = {part2.exercises} exercises3 = {part3.exercises} />
    </div>
  )
}

export default App