import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './style.scss';

const CheckIn = () => (
  <div id="registration">
    <Field
      className="field1"
      name="login"
      type="text"
      component="textarea"
      placeholder="Login"
      autoComplete="off"
      autoFocus
      required
    />
    <Field
      className="field2"
      name="email"
      type="text"
      component="textarea"
      placeholder="email"
      autoComplete="off"
    />
    <Field
      className="field3"
      name="password"
      type="text"
      component="textarea"
      placeholder="password"
      autoComplete="off"
    />
    <Field
      className="field4"
      name="password_repeat"
      type="text"
      component="textarea"
      placeholder="repeat password"
      autoComplete="off"
    />
  </div>
);

export default reduxForm({
  form: 'Check-in',
})(CheckIn);
