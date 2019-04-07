import * as constants from 'const';
import { buildHttpActionCreators } from '../utils/redux-utils';

const { SIGN_IN, SIGN_UP, GET_DATA, VALIDATE_LOGIN } = constants;

export const getUserData = buildHttpActionCreators(GET_DATA);

export const signIn = buildHttpActionCreators(SIGN_IN);

export const signUp = buildHttpActionCreators(SIGN_UP);

export const loginValidator = buildHttpActionCreators(VALIDATE_LOGIN);

export const setToStorage = ({ token, data }) => {
  if (token) {
    localStorage.setItem('token', token);
  }
  if (data) {
    localStorage.setItem('userData', JSON.stringify({ login: data.login }));
  }
};

export const getFromStorage = () => JSON.parse(localStorage.getItem('userData'));
