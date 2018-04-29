import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.scss';

const SignInForm = ({ handleSubmit, goToSignUp, hasError, resetErrorStyle }) => (
  <form id="sign-in-form" onSubmit={handleSubmit}>
    <div className="panel">
      <Field
        className={ classNames({ 'has-error': hasError })}
        name="login"
        type="text"
        component="input"
        placeholder="Login"
        autoComplete="off"
        onClick={resetErrorStyle}
        autoFocus
        required
      />
      <Field
        className={ classNames({ 'has-error': hasError })}
        name="password"
        type="text"
        component="input"
        placeholder="password"
        autoComplete="off"
        onClick={resetErrorStyle}
        required
      />
    </div>
    <button type="submit" className="submit-btn">Sign in</button>
    <button type="button" className="transition-btn" onClick={ goToSignUp }>Create an account</button>
  </form>
);

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  goToSignUp: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  resetErrorStyle: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'SignIn',
})(SignInForm);
