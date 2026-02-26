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
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
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
      <table>
      <tbody>
          <StatisticLine text="Good" value={props.good} />
          <StatisticLine text="Neutral" value={props.neutral} />        
          <StatisticLine text="Bad" value={props.bad} />        
          <StatisticLine text="All" value={props.all} />        
          <StatisticLine text="Average" value={props.average} />
          <StatisticLine text="Positive" value={props.positive + "%"} />
      </tbody>
      </table>
    </div>
  )
}

const App = () => {
  
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
