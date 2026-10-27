import { useState } from "react"

const Display = ({score}) => {
  return(
    <h1>{score}</h1>
  )
}

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  );
}

const ScoreKeeper = () => {
  const [score, setScore] = useState(0)
  console.log('current State: ', score);
  const addOne = () => {setScore(score + 1) 
    console.log('Add One, score is:', score);}
  const subtractOne = () => {setScore(score - 1)
    console.log('Subtract One score is:', score)}
  const addFive = () => {setScore(score + 5)
    console.log('Add Five score is:', score)
  }
  const reset = () => {setScore(0)
    console.log('Reset to Zero score is:', score)
  }
  return(
    <div>
      <Display score = {score}/>
      <Button onClick={addOne} text='+1' />
      <Button onClick={subtractOne} text='-1' />
      <Button onClick={addFive} text='+5' />
      <Button onClick={reset} text='Reset' />

    </div>
  )
}

const App = () => {
  
  return(
    <div>
      <ScoreKeeper />
    </div>
  )
}

export default App