import "./App.css";
import React, { useState } from "react";
import Button from "./Button";

function App() {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const changeAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * (anecdotes.length - 1) + 1);
    setSelected(randomNumber);
  };

  const zeroFilledArr = new Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(zeroFilledArr);
  const vote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const maxVoteCount = Math.max(...votes);
  const maxVote = anecdotes[votes.indexOf(maxVoteCount)];

  return (
    <div className="App App-header">
      <h2>Anecdote of the day</h2>
      <p>
        {anecdotes[selected]}
        <br />
        <span>has {votes[selected]} votes</span>
      </p>
      <div>
        <Button handleClick={() => vote()} text="Vote" />
        <span> </span>
        <Button handleClick={() => changeAnecdote()} text="Next Anecdote" />
      </div>
      {Math.max(...votes) !== 0 && (
        <div>
          <h2>Anecdote with most votes</h2>
          <p>{maxVote}</p>
	  <p>has {maxVoteCount} votes</p>
        </div>
      )}
    </div>
  );
}

export default App;
