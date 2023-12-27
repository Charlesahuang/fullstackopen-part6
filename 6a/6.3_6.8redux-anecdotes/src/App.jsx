import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote, addAnecdote } from './reducers/anecdoteReducer';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const [newAnecdote, setNewAnecdote] = useState('');

  const handleAddAnecdote = () => {
    dispatch(addAnecdote(newAnecdote));
    setNewAnecdote('');
  };

  return (
    <div>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  );
};

export default App;
