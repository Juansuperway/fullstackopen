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
const StatisticsLine = (props) => {
  return (
      <p>{props.text}: {props.value}</p>
  )
}
const Statistics = (props) => {
  console.log(props)
  if (props.all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feddback given</p>
      </div>
    )
    
  }
  return (
    <div>
      <h2>Statistics</h2>
        <StatisticsLine text="Good" value={props.good} />
        <StatisticsLine text="Neutral" value={props.neutral} />
        <StatisticsLine text="Bad" value={props.bad} />
        <StatisticsLine text="All" value={props.all} />
        <StatisticsLine text="Average" value={props.average} />
        <StatisticsLine text="Positive" value={props.positive + "%"} />
        
      
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : (good / all) * 100
  return (
    <div>
      <h1>Give feedback</h1>
      <br/>
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
      
    </div>
  )
}

export default App
