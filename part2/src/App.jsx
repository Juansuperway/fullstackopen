const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
    props.parts.map((part) => {
      console.log(part)
      return (
        <Part key={part.name} part={part} />
      )}
))

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
    const total = props.parts.reduce((acc, part) => acc + part.exercises, 0)
    console.log(total)
    return <p>Total of {total} exercises</p>
  }


const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total
        parts={props.course.parts}
      />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ],
  }

  return <Course course={course} />
}

export default App
