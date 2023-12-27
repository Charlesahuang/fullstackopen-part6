import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
import {  addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [newAnecdote, setNewAnecdote] = useState('');

  const handleAddAnecdote = () => {
    dispatch(addAnecdote(newAnecdote));
    setNewAnecdote('');
  };

  return (
    <div>
      <h2>Create new</h2>
      <div>
        <input
          type="text"
          value={newAnecdote}
          onChange={(e) => setNewAnecdote(e.target.value)}
        />
      </div>
      <button onClick={handleAddAnecdote}>Create</button>
    </div>
  );
};

export default AnecdoteForm;
