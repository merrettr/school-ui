import React from 'react';

import ListItem from './ListItem';

const Student = ({ id, firstName, lastName, onClick }) =>
  <ListItem
    onClick={() => onClick(id)}
  >
    <div style={{ width: '100%' }} >{`${firstName} ${lastName}`}</div>
  </ListItem>;

export default Student;