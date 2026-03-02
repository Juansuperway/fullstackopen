const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => (
    props.parts.map((part) => {
      console.log(part)
      return (
        <Part key={part.id} part={part} />
      )}
))

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
    const total = props.parts.reduce((s, p) => s + p.exercises, 0)
    console.log(total)
    return <p>Total of {total} exercises</p>
  }


const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <strong><Total
        parts={props.course.parts}
      /></strong>
    </div>
  )
}

export default Course