import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';

const App = ({ children }) =>
    <Grid style={{ height: '100%', paddingTop: '6em', paddingBottom: '6em' }} fluid >
      {children}
    </Grid>;

export default App;
