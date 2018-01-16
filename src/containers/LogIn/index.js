import React from 'react';
import Form from 'components/ReduxForm';
import './style.scss';

const LogIn = props => (
  <div id="authentication">
    <Form
      formId="logIn"
      form="logIn"
      f1name="login"
      f2name="password"
      placeholder1="Login"
      placeholder2="Password"
      comp1="input"
      comp2="input"
      type2="password"
      submitBtnTitle="Log in"
      secondBtnTitle="Check in"
      secondBtnFunc={() => props.history.push('/checkIn')}
    />
  </div>
);

export default LogIn;
