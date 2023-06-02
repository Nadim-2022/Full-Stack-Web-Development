
const Header = ({course}) => {
    return (
      <div>
        <h1>{course.name}</h1>
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
        <p><b>total of {sum} exercises</b>
        </p>
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


const Course = ({course}) => {
    return (
        <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
        </div>
    )


}





export default Course;