import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';
//6.9
const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <div>
        Filter:
        <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
    </div>
  );
};

export default Filter;
