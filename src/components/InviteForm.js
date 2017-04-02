import React from "react";
import { Field, reduxForm } from 'redux-form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Grid from 'react-bootstrap/lib/Grid';
import Submit from './Submit';
import Spinner from './Spinner';

// create components here to prevent them being recreated each time render runs with redux-form
// https://github.com/erikras/redux-form/issues/1094

const FirstName = ({ input: { value, onChange }, meta: { touched, error }, disabled }) =>
  <FormGroup validationState={touched && error ? 'error' : null}>
    <ControlLabel>First Name</ControlLabel>
    <FormControl
      type="text"
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>;

const LastName = ({ input: { value, onChange }, meta: { touched, error }, disabled }) =>
  <FormGroup validationState={touched && error ? 'error' : null}>
    <ControlLabel>Last Name</ControlLabel>
    <FormControl
      type="text"
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>;

const Email = ({ input: { value, onChange }, meta: { touched, error }, disabled }) =>
  <FormGroup validationState={touched && error ? 'error' : null}>
    <ControlLabel>Email</ControlLabel>
    <FormControl
      type="email"
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>;

const validate = ({ firstName, lastName, email }) => {
  const errors = {};

  if (!firstName || firstName.length < 2) {
    errors.firstName = 'Please enter a valid first name';
  }
  if (!lastName || lastName.length < 2) {
    errors.lastName = 'Please enter a valid last name';
  }
  if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Please enter a valid email';
  }

  return errors;
};

const InviteForm = ({ handleSubmit, isSubmitting }) =>
  <form onSubmit={handleSubmit}>
    <Grid fluid>
      <Field
        name="firstName"
        type="text"
        label="First Name"
        component={FirstName}
        disabled={isSubmitting}
      />
      <Field
        name="lastName"
        type="text"
        label="Last Name"
        component={LastName}
        disabled={isSubmitting}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        component={Email}
        disabled={isSubmitting}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!isSubmitting
          ? <Submit />
          : <Spinner />}
      </div>
    </Grid>
  </form>;

export default reduxForm({
  form: 'InviteForm',
  validate,
})(InviteForm);