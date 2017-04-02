import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Table from 'react-bootstrap/lib/Table';

export default ({ created, updated, deleted }) =>
  <Grid fluid style={{ display: 'flex', justifyContent: 'center', marginTop: '3em' }}>
    <Table>
      <thead>
        <tr>
          <th>Students Created</th>
          <th>Students Updated</th>
          <th>Students Removed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{created}</td>
          <td>{updated}</td>
          <td>{deleted}</td>
        </tr>
      </tbody>
    </Table>
  </Grid>;