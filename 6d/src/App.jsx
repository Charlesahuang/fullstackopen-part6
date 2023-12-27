import React, { useReducer, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { searchAnecdotes, getAllAnecdotes, updateAnecdoteVotes } from './request';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE_SUCCESS':
      return { message: `You voted for anecdote with ${action.votes} votes! BY ${action.votes_content}` };
    case 'CLEAR_NOTIFICATION':
      return { message: null };
    default:
      return state;
  }
};

const App = () => {
  const [notificationState, dispatch] = useReducer(notificationReducer, {
    message: null,
  });
  const queryClient = useQueryClient();
  const voteMutation = useMutation(
    (anecdote) => updateAnecdoteVotes(anecdote.id, anecdote.votes + 1),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes');
      },
    }
  );

  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
  });
  const { isLoading, data: anecdotes } = anecdotesQuery;
  // const handleVote = (anecdote) => {
  //   voteMutation.mutate(anecdote);
  // };

  const handleVote = async (anecdote) => {
    try {
      await voteMutation.mutateAsync(anecdote);


      dispatch({
        type: 'VOTE_SUCCESS',
        votes: anecdote.votes + 1,
        votes_content:anecdote.content
      });


      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000); // 3秒后清除通知
    } catch (error) {
      console.error('Error voting:', error.message);
    }
  };

  if (isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification message={notificationState.message}  />
      <AnecdoteForm queryClient={queryClient} />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
