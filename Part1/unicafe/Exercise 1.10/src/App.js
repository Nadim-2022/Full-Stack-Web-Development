
import { click } from '@testing-library/user-event/dist/click'
import { useState } from 'react'

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {text === 'positive' ? `${value} %` : value}
  </p>
)

const Statistics = (props) =>{
  if(props.all === 0){
    return(
      <div>
        <h1> statistics </h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h1> statistics </h1>
      <StatisticLine text="good" value ={props.good}/>
      <StatisticLine text="neutral" value ={props.neutral}/>
      <StatisticLine text="bad" value ={props.bad}/>
      <StatisticLine text="all" value ={props.all}/>
      <StatisticLine text="average" value ={(props.good-props.bad)/props.all}/>
      <StatisticLine text="positive" value ={props.good/props.all}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll] = useState(0)
  const [average,setAverage] = useState(0)
  const [positive,setPositive] = useState(0)

  const Buttongood = () =>{
    setGood(good+1)
    setAll(all+1)
  }
  const Buttonneutral = () =>{
    setNeutral(neutral+1)
    setAll(all+1)
  }
  const Buttonbad = () =>{
    setBad(bad+1)
    setAll(all+1)
  }

  return (
    <div>
      <h1> give feedback </h1>
      <button onClick={Buttongood}>good</button>
      <button onClick={Buttonneutral}>neutral</button>
      <button onClick={Buttonbad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App
