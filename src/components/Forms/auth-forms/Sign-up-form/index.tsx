import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { debounce } from 'lodash';
import './style.scss';
import Validators from '../../../../utils/form-validators';

const checker = bool =>
  bool ? (
    <i className="fa fa-check" aria-hidden="true" />
  ) : (
    <i className="fa fa-times" aria-hidden="true" />
  );

const renderField = ({
  className,
  input,
  name,
  placeholder,
  type,
  loginValidationData,
  isValid
}) => (
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
    {loginValidationData.login && (
      <div className="indicator">{checker(loginValidationData.isValid)}</div>
    )}
  </div>
);

const SignUpForm = props => {
  const { handleSubmit, goToSignIn, validateLogin, loginValidationData, invalid } = props;
  return (
    <form id="sign-up-form" onSubmit={handleSubmit}>
      <div className="panel">
        <Field
          className="login"
          name="login"
          type="text"
          component={renderField}
          placeholder="Login"
          loginValidationData={loginValidationData}
          onChange={debounce(({ target: { value } }) => {
            validateLogin({ login: value });
          }, 1000)}
          validate={[Validators.required, Validators.minLength(4)]}
          autoFocus
        />
        <Field
          className="email"
          name="email"
          type="text"
          component="input"
          placeholder="email"
          autoComplete="off"
          validate={[Validators.required, Validators.email]}
          required
        />
        <Field
          className="password"
          name="password"
          type="password"
          component="input"
          placeholder="password"
          autoComplete="off"
          validate={[Validators.required, Validators.minLength(4)]}
          required
        />
      </div>
      <button type="submit" disabled={!loginValidationData.isValid} className="submit-btn">
        Create
      </button>
      <button type="button" className="transition-btn" onClick={goToSignIn}>
        go back
      </button>
    </form>
  );
};

export default reduxForm({
  form: 'SignUp'
})(SignUpForm);
