import { addNewAnecdote } from "../request"
import React, { useReducer, useEffect } from 'react';
import Notification from "./Notification";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CONTENT_NEED_MORE':
      return { message: `${action.message}` };
    case 'CLEAR_NOTIFICATION':
      return { message: null };
    default:
      return state;
  }
};

const AnecdoteForm = ({ queryClient }) => {
  const [notificationState, dispatch] = useReducer(notificationReducer, {
    message: null,
  });

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    try {
      let res = await addNewAnecdote(content)
      await queryClient.invalidateQueries('anecdotes');
    } catch (error) {
      if (error && error.message) {
        // setErrorMessage(error.response.data.error);

        dispatch({
          type: 'CONTENT_NEED_MORE',
          message:error.message
        });

        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' });
        }, 3000); // 

      } else {
      }
    }
  }

  return (
    <>
      <Notification message={notificationState.message} />
      <div>
        <h3>create new</h3>
        <form onSubmit={onCreate}>
          <input name='anecdote' />
          <button type="submit">create</button>
        </form>
      </div>
    </>

  )
}

export default AnecdoteForm
