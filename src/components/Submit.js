import React from 'react';
import Button from 'react-bootstrap/lib/Button';

const Submit = ({ disabled, onClick }) =>
  <Button
    disabled={disabled}
    type="submit"
    onClick={onClick}
    style={{
      backgroundColor: '#c3040c',
      color: '#fff',
    }}
  >
    Submit
  </Button>;

export default Submit;