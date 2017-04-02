import React from 'react';
import Table from 'react-bootstrap/lib/Table';

export default ({ invites }) =>
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3em' }}>
    <Table hover>
      <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Invited At</th>
      </tr>
      </thead>
      <tbody>
      {
        invites.map(({ id, firstName, lastName, email, createdAt }) =>
        <tr key={id}>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          <td>{new Date(Date.parse(createdAt)).toLocaleString('en-NZ')}</td>
        </tr>)
      }
      </tbody>
    </Table>
  </div>;