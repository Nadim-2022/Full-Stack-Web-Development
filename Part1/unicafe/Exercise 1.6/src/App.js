
import { click } from '@testing-library/user-event/dist/click'
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Buttongood = () =>{
    setGood(good+1)
  }
  const Buttonneutral = () =>{
    setNeutral(neutral+1)
  }
  const Buttonbad = () =>{
    setBad(bad+1)
  }

  return (
    <div>
      <h1> give feedback </h1>
      <button onClick={Buttongood}>good</button>
      <button onClick={Buttonneutral}>neutral</button>
      <button onClick={Buttonbad}>bad</button>
      <h1> statistics </h1>
      <p>good {good}</p>
      <p>netural {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App
