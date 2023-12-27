import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// const getId = () => (100000 * Math.random()).toFixed(0)
// 异步获取数据的 thunk action //6.14  //6.16 使用createAsyncThunk
const fetchAndSortAnecdotes = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes');
  const sortedAnecdotes = response.data.sort((a, b) => b.votes - a.votes);
  return sortedAnecdotes;
};

export const fetchAnecdotes = createAsyncThunk('anecdotes/fetchAnecdotes', fetchAndSortAnecdotes);

export const PostaddAnecdote = createAsyncThunk('anecdotes/addAnecdote', async (newAnecdoteContent) => {
  await axios.post('http://localhost:3001/anecdotes', newAnecdoteContent);
  return fetchAndSortAnecdotes(); // 使用fetchAndSortAnecdotes函数
});


export const Vote = createAsyncThunk('anecdotes/Vote', async (VoteObj) => {
  await axios.put(`http://localhost:3001/anecdotes/${VoteObj.id}`, VoteObj);
  return fetchAndSortAnecdotes(); // 使用fetchAndSortAnecdotes函数
});

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAnecdotes.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(PostaddAnecdote.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(Vote.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addAnecdote, vote } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
