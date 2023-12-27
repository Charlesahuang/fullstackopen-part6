import React from 'react';
//6.12
const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginTop: '10px',
  };

  return (
    <div style={style}>
      {props.message} 
    </div>
  );
};

export default Notification;
