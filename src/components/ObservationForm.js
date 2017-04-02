import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Submit from './Submit';
import Spinner from './Spinner';

const Note = ({ input: { value, onChange }, meta: { touched, error }, disabled }) =>
  <FormGroup validationState={touched && error ? 'error' : null}>
    <ControlLabel>Notes (Optional)</ControlLabel>
    <FormControl
      componentClass="textarea"
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>;

export const ObservationForm = ({ handleSubmit, isSubmitting, categories }) =>
  <form onSubmit={handleSubmit}>
    <Field
      name="notes"
      type="textarea"
      label="Notes (Optional)"
      component={Note}
      disabled={isSubmitting}
    />

    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {!isSubmitting
        ? <Submit />
        : <Spinner />}
    </div>
  </form>;

export default reduxForm({
  form: 'ObservationForm'
})(ObservationForm);