import * as constants from 'const';

const {
  SIGN_IN,
  SIGN_UP,
  SIGN_IN_RESPONSE,
  SIGN_UP_RESPONSE,
  GET_DATA,
  GET_DATA_RESPONSE,
  VALIDATE_LOGIN,
  VALIDATE_LOGIN_RES
} = constants;

export const getUserData = () => ({
  type: GET_DATA
});

export const handleUserData = response => ({
  type: GET_DATA_RESPONSE,
  response
});

export const signIn = data => ({
  type: SIGN_IN,
  data
});

export const handleSignInData = response => ({
  type: SIGN_IN_RESPONSE,
  response
});

export const signUp = data => ({
  type: SIGN_UP,
  data
});

export const handleSignUpData = response => ({
  type: SIGN_UP_RESPONSE,
  response
});

export const loginValidator = data => ({
  type: VALIDATE_LOGIN,
  data
});

export const handleLoginValidator = response => ({
  type: VALIDATE_LOGIN_RES,
  response
});

// additional methods

export const setToStorage = ({ token, data }) => {
  if (token) {
    localStorage.setItem('token', token);
  }
  if (data) {
    localStorage.setItem('userData', JSON.stringify({ login: data.login }));
  }
};

export const getFromStorage = () => JSON.parse(localStorage.getItem('userData'));
