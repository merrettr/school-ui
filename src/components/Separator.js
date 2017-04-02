import React from "react";
import Heading from './Heading';

const Separator = ({ title }) =>
  <div style={{ margin: '1em 0' }}>
    <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{
          width: '80%',
          border: 0,
          height: 0,
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      ></div>
    </div>

    <Heading>{title}</Heading>
  </div>;

export default Separator;