import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Vote } from '../reducers/anecdoteReducer';
import Notification from './Notification';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [notification, setNotification] = useState(null);
  const notificationTimeoutRef = useRef(null);

  const visibleAnecdotes = filter
    ? anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    : anecdotes;

  const handleVote = (anecdote) => {

    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    dispatch(Vote(updatedAnecdote));



    //6.13
    setNotification(`You voted for "${anecdote.content}"`);


    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {notification && <Notification message={notification} />}
      <div>
        <h2>Anecdotes</h2>
        {visibleAnecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AnecdoteList;
