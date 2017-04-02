import React, { PropTypes } from 'react';
import Col from 'react-bootstrap/lib/Col';
import times from 'lodash/times';

const List = ({ firstItem, items, columns, onRender }) =>
  <div style={{ marginTop: '1em' }}>
     {firstItem && <Col
        md={12 / (columns || 1)}
        xs={12}
        style={{ marginBottom: '1em' }}
      >
        {firstItem}
      </Col>}
    
    {times(Array.isArray(items) ? items.length : items, i => {
      const item = Array.isArray(items) ? items[i] : null;

      return <Col
        key={item ? item.id || i : i}
        md={12 / (columns || 1)}
        xs={12}
        style={{ marginBottom: '1em' }}
      >
        {onRender(item || i, i)}
      </Col>
    })}
  </div>;

List.propTypes = {
  items: PropTypes.any.isRequired,
  columns: PropTypes.number,
  onRender: PropTypes.func.isRequired,
};

export default List;