import axios from 'axios';

const baseURL = 'http://localhost:3001';

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
}

const searchAnecdotes = async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await axios.get(`${baseURL}/anecdotes/search?query=${encodedQuery}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error searching anecdotes:', error.message);
    throw error;
  }
}

const getAllAnecdotes = async () => {
  try {
    const response = await axios.get(`${baseURL}/anecdotes/all`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching all anecdotes:', error.message);
    throw error;
  }
}

const updateAnecdoteVotes = async (id, votes) => {
  try {
    const response = await axios.put(`${baseURL}/anecdotes/update/${id}`, { votes });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error updating anecdote with id ${id}:`, error.message);
    throw error;
  }
}

const addNewAnecdote = async (content) => {
  try {
    const response = await axios.post(`${baseURL}/anecdotes/add`, { content });
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error;
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
}


export { searchAnecdotes, getAllAnecdotes, updateAnecdoteVotes, addNewAnecdote };
