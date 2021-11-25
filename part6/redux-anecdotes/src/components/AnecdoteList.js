import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filterText }) => {
    if (filterText.length === 0) {
      return anecdotes;
    }
    return anecdotes.filter((item) => item.content.includes(filterText));
  }).sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const vote = (id) => {
    let anecdote = anecdotes.find((item) => item.id === id);
    dispatch(addVote(anecdote));
    const message = `You voted for "${anecdote.content}"`;
    dispatch(setNotification(message, 5));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
