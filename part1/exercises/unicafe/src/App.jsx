import { useState } from 'react'


const Header = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}


const Statistics = ({good, neutral, bad,total, average, positive}) => {
  if(total === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    );
  }else{

  return(
  <table>
    <tbody>
      <DataCell text ='Good' value={good}/>
      <DataCell text ='Neutral' value={neutral}/>
      <DataCell text ='Bad' value={bad}/>
      <DataCell text='Total' value={total}/>
      <DataCell text='Average' value={average}/>
      <DataCell text='Positive' value={positive}/>
    </tbody>
  </table>
  );
}
}

const DataCell = ({text,value}) => {
return(
  <tr>
  <td>{text}</td>
  <td>{value}</td>
  </tr>
);
}





const App = () => {
  // save clicks of each button to its own state
const [good,setGood] = useState(0)
const [neutral,setNeutral] = useState(0)
const [bad,setBad] = useState(0)
// data

const total = good + bad + neutral
const positive = (good / total)*100
const average = (good - bad) / 3

const title = "Give Feedback"


// event handlers
const addGood = () => {

  setGood(good + 1)

}
const addBad = () => {

  setBad(bad + 1)

}
const addNeutral = () => {

  setNeutral(neutral + 1)

}

return(
<div>
  <Header title={title}/>
  
  <Button onClick={addGood} text = 'Good'/>
  <Button onClick={addNeutral} text = 'Neutral'/>
  <Button onClick={addBad} text = 'Bad'/>

  <Header title='Statistics' />

  <Statistics good={good} bad={bad} neutral={neutral} total={total} positive={positive} average={average}/>

</div>
);

}

export default App