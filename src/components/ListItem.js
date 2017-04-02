import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const ListItem = ({ children, icon, style, onClick }) =>
  <Panel
    onClick={onClick}
    style={{
      padding: '1em',
      marginBottom: 0,
      cursor: 'pointer',
      ...style,
    }}
  >
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%' }} >{children}</div>
      { icon || <Glyphicon glyph="menu-right" /> }
    </div>
  </Panel>;

export default ListItem;