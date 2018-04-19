import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './style.scss';

const LogIn = ({ handleSubmit }) => (
  <form id="authentication" onSubmit={ handleSubmit }>
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
      name="password"
      type="text"
      component="textarea"
      placeholder="password"
      autoComplete="off"
    />
    <button type="submit" className="login">Log in</button>
  </form>
);

export default reduxForm({
  form: 'Login',
})(LogIn);
