import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { debounce } from 'lodash';
import './style.scss';

const SignUpForm = ({ handleSubmit, goToSignIn, validateLogin }) => (
  <form id="sign-up-form" onSubmit={ handleSubmit }>
    <div className="panel">
      <Field
        className="login"
        name="login"
        type="text"
        component="input"
        placeholder="Login"
        onChange={debounce((e) => { validateLogin(e); }, 700)}
        autoComplete="off"
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
        type="text"
        component="input"
        placeholder="password"
        autoComplete="off"
        required
      />
      {/* <Field
        className="confirm-password"
        name="password_repeat"
        type="text"
        component="input"
        placeholder="confirm password"
        autoComplete="off"
        required
      /> */}
    </div>
    <button type="submit" className="submit-btn">Create</button>
    <button type="button" className="transition-btn" onClick={ goToSignIn }>go back</button>
  </form>
);

export default reduxForm({
  form: 'SignUp',
})(SignUpForm);
