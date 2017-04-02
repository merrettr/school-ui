import React from 'react';

const Spinner = ({ scale = 1, visible = true }) =>
  visible
  ? <div style={{ display: 'flex', justifyContent: 'center' }}>
    <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" style={{ fontSize: `${scale * 3}em` }}/>
    <span className="sr-only">Loading...</span>
  </div>
  : <div></div>;

export default Spinner;