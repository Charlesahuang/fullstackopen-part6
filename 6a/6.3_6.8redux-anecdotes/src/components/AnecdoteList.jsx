import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleVote = (id) => {
    dispatch(vote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
