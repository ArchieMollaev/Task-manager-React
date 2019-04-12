import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import './style.scss';

const SignInForm = ({ handleSubmit, goToSignUp, hasError, resetWarning }) => (
  <form id="sign-in-form" onSubmit={handleSubmit}>
    <div className="panel">
      <Field
        className={classNames({ 'has-error': hasError })}
        name="login"
        type="text"
        component="input"
        placeholder="Login"
        autoComplete="off"
        onClick={resetWarning}
        autoFocus
        required
      />
      <Field
        className={classNames({ 'has-error': hasError })}
        name="password"
        type="password"
        component="input"
        placeholder="password"
        autoComplete="off"
        onClick={resetWarning}
        required
      />
    </div>
    <button type="submit" className="submit-btn">
      Sign in
    </button>
    <button type="button" className="transition-btn" onClick={goToSignUp}>
      Create an account
    </button>
  </form>
);

export default reduxForm({
  form: 'SignIn'
})(SignInForm);
