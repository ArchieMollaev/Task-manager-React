import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './style.scss';

const SignInForm = ({ handleSubmit, goToSignUp }) => (
  <form id="sign-in-form" onSubmit={ handleSubmit }>
    <div className="panel">
      <Field
        className="login"
        name="login"
        type="text"
        component="input"
        placeholder="Login"
        autoComplete="off"
        autoFocus
        required
      />
      <Field
        className="password"
        name="password"
        type="text"
        component="input"
        placeholder="password"
        autoComplete="off"
        required
      />
    </div>
    <button type="submit" className="submit-btn">Log in</button>
    <button type="button" className="transition-btn" onClick={ goToSignUp }>Sign Up</button>
  </form>
);

export default reduxForm({
  form: 'SignIn',
})(SignInForm);
