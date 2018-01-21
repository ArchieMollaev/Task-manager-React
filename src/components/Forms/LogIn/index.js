import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './style.scss';

const LogIn = () => (
  <div id="authentication">
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
      name="taskNotes"
      type="text"
      component="textarea"
      placeholder="password"
      autoComplete="off"
    />
  </div>
);

export default reduxForm({
  form: 'Log-in',
})(LogIn);
