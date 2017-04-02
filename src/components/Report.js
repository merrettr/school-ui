import React, { PropTypes } from 'react';
import { decamelize } from 'humps';
import startCase from 'lodash/startCase';
import Panel from 'react-bootstrap/lib/Panel';
import Table from 'react-bootstrap/lib/Table';

const Report = ({ data }) => {
  const demo = data && data[0];

  if (!demo) {
    return <div></div>;
  }

  return <Panel>
    <Table responsive>
      <thead>
        <tr>
          {Object.keys(demo).map((key, i) =>
            <th key={i}>{startCase(decamelize(key, { separator: ' ' }))}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) =>
          <tr key={i}>{Object.keys(row).map((key, j) =>
            <td key={j}>{row[key]}</td>)}
          </tr>)}
      </tbody>
    </Table>
  </Panel>;
};

Report.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Report;