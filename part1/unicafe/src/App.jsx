import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const goodCount = good
  const neutralCount = neutral
  const badCount = bad
  const all = good + neutral + bad
  const positive = (good) / all
  const average = ((good - bad) / all) * 100
  return (
    <div>
      <h1>Give feedback</h1>
      <br/>
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      

      <p>Good: {goodCount}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive} %</p>
    </div>
  )
}

export default App
