import { useState } from 'react'
// This is a reusable component
const Anecdote = ({ anecdote, votes }) => {
 return(
 <div>
    <p>{anecdote}</p>
  <p>has {votes} votes</p>
  </div>
 )
}
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}
const MostVotedAnecdote = ({anecdotes, votes}) => {
  let winner = 0
  for (let i = 0; i < anecdotes.length; i++){
    if (votes[winner] < votes[i]){
      winner = i
    }
  }
  return(<div>
        <Anecdote anecdote={anecdotes[winner]} votes={votes[winner]}/>
      </div>)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})
  
  const handleVotes = () => {
    const copyVotes = {...votes}
      copyVotes[selected] += 1
    setVotes(copyVotes)
  }
  const  handleNewAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={handleNewAnecdote} text='Create New Anecdote'/>
      <Button onClick={handleVotes} text='Vote'/>
      <h2>Anecdotes with Most Votes</h2>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App