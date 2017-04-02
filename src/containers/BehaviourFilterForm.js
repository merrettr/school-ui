import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from '../components/DatePicker';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

const BehaviourFilterForm = ({ handleSubmit }) => {
  const renderDatePicker = ({ input: { value, onChange }}, placeholder) => {
    return <DatePicker
      {...{
        date: value,
        onChange,
        placeholder
      }}
    />
  };

  return <form onSubmit={handleSubmit}>
    <Panel style={{ margin: '.5em 0 .5em 0' }} >
      <Grid fluid>
        <Row>
          <Col md={6}>
            <FormGroup>
              <ControlLabel>Start Date</ControlLabel>
              <Field name="from" component={form => renderDatePicker(form, 'Start Date')} label="Start Date" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <ControlLabel>End Date</ControlLabel>
              <Field name="to" component={form => renderDatePicker(form, 'End Date')} label="Start Date" />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={2} style={{ float: 'right' }}>
            <Button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#c3040c',
                color: '#fff',
              }}
            >
              Filter
            </Button>
          </Col>
        </Row>
      </Grid>
    </Panel>
  </form>;
};

export default reduxForm({
  form: 'BehaviourFilterForm',
  destroyOnUnmount: false,
})(BehaviourFilterForm);