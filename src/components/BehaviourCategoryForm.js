import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Submit from './Submit';
import Spinner from './Spinner';

const Description = ({ input: { value, onChange }, meta: { touched, error }, disabled }) =>
  <FormGroup validationState={touched && error ? 'error' : null}>
    <ControlLabel>Description</ControlLabel>
    <FormControl
      type="text"
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>;

const Enabled = ({ input: { value, onChange }, disabled }) => {
  return <ButtonGroup data-toggle="buttons">
    <label
      className="btn btn-default"
      style={{
        backgroundColor: value && '#337ab7',
        borderColor: value && '#2e6da4',
        color: value && '#fff',
      }}
    >
      Enabled
      <FormControl
        type="radio"
        name="isEnabled"
        value="true"
        onChange={() => onChange(true)}
        disabled={disabled}
      />
    </label>

    <label className="btn btn-default"
      style={{
        backgroundColor: !value && '#c3040c',
        color: !value && '#fff',
      }}
    >
      Disabled
      <FormControl
        type="radio"
        name="isEnabled"
        value="false"
        onChange={() => onChange(false)}
        disabled={disabled}
      />
    </label>
  </ButtonGroup>;
};

const validate = ({ description }) => {
  const errors = {};

  if (!description || description.length < 2) {
    errors.description = 'Please enter a valid description';
  }

  return errors;
};

export const BehaviourCategoryForm = ({ handleSubmit, isSubmitting }) =>
  <form onSubmit={handleSubmit}>
    <Field
      name="description"
      type="text"
      label="Description"
      component={Description}
      disabled={isSubmitting}
    />
    <Field
      name="isEnabled"
      type="checkbox"
      label="Enabled"
      component={Enabled}
      disabled={isSubmitting}
    />

    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {!isSubmitting
        ? <Submit />
        : <Spinner />}
    </div>
  </form>;

export default reduxForm({
  form: 'BehaviourCategoryForm',
  initialValues: { isEnabled: true },
  validate,
})(BehaviourCategoryForm);