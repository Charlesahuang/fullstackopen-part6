import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PostaddAnecdote } from '../reducers/anecdoteReducer';
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [newAnecdote, setNewAnecdote] = useState('');

  const handleAddAnecdote = async () => {
    setNewAnecdote('');
    let obj = {
      content: newAnecdote,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0
    }
    dispatch(PostaddAnecdote(obj))
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
