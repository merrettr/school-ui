import React from 'react';

const renderMessage = message => {
  if (!message) {
    return null;
  }

  if (typeof(message) === 'string') {
    return message;
  }

  let error = '';

  if (typeof(message) === 'object') {
    Object.keys(message).forEach(key => {
      message[key].forEach(line => {
        error += line + '\n';
      })
    })
  }

  return error;
};

const Error = ({ message }) =>
  <div style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  }}>
    <p style={{ 'color': 'red' }}>{renderMessage(message)}</p>
  </div>;

export default Error;