import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import './style.scss';

const checker = bool =>
  bool ? (
    <i className="fa fa-check" aria-hidden="true" />
  ) : (
    <i className="fa fa-times" aria-hidden="true" />
  );

const renderField = ({ className, input, name, placeholder, type, validationAttempt, isValid }) => (
  <div className={className}>
    <input
      {...input}
      placeholder={placeholder}
      type={type}
      name={name}
      autoFocus="true"
      autoComplete="off"
      required
    />
    {validationAttempt ? <div className="indicator">{checker(isValid)}</div> : null}
  </div>
);

const SignUpForm = ({
  handleSubmit,
  goToSignIn,
  validateLogin,
  loginValidationAttempt,
  loginValidationStatus,
}) => (
  <form id="sign-up-form" onSubmit={handleSubmit}>
    <div className="panel">
      <Field
        className="login"
        name="login"
        type="text"
        component={renderField}
        placeholder="Login"
        validationAttempt={loginValidationAttempt}
        isValid={loginValidationStatus}
        onChange={debounce(e => {
          validateLogin(e);
        }, 1000)}
        autoFocus
      />
      <Field
        className="email"
        name="email"
        type="text"
        component="input"
        placeholder="email"
        autoComplete="off"
        required
      />
      <Field
        className="password"
        name="password"
        type="password"
        component="input"
        placeholder="password"
        autoComplete="off"
        required
      />
    </div>
    <button type="submit" className="submit-btn">
      Create
    </button>
    <button type="button" className="transition-btn" onClick={goToSignIn}>
      go back
    </button>
  </form>
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  goToSignIn: PropTypes.func.isRequired,
  loginValidationAttempt: PropTypes.bool.isRequired,
  loginValidationStatus: PropTypes.bool.isRequired,
  validateLogin: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'SignUp',
})(SignUpForm);
