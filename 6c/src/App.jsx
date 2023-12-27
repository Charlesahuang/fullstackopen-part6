import React, { useEffect } from 'react';
import {  useDispatch } from 'react-redux';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import { fetchAnecdotes } from './reducers/anecdoteReducer';
const App = () => {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAnecdotes());
  }, [dispatch]);
  return (
    <div>
      <Filter/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
