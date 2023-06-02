const Header = ({ courses }) => {
    console.log(courses);
    return (
      <div>
        {courses.map((course) => (
          <h1 key={course.id}>{course.name}</h1>
        ))}
      </div>
    )
  }

  const Content = ({courses}) => {
    return (
      <div>
        {courses.map((course) => (
          <Part key={course.id} course={course} />
        ))}
      </div>
    )
  }
  
  const Part = ({ course }) => {
    return (
        <div>
            {course.parts.map((part) => (
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            ))}
        </div>
    )
    }

    const Total = (props) => {
        const sum = props.parts.reduce((total, part) => total + part.exercises, 0);
        return (
          <div>
            <p><b>total of {sum} exercises</b></p>
          </div>
        )
      }
  const Course = ({ courses }) => {
    return (
        <div>
        {courses.map((course) =>(
            <div key={course.id}>
                <Header courses={[course]} />
                <Content courses={[course]} />
                <Total parts={course.parts} />
            </div>
        ))}
        </div>
    )
  }
  export default Course;