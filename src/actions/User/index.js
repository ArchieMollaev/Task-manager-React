import * as constants from 'const';
import axiosDefaults from 'axios/lib/defaults';

const {
  SIGN_IN,
  SIGN_IN_RESPONSE,
  GET_DATA,
  GET_DATA_RESPONSE,
} = constants;

export const getUserData = () => ({
  type: GET_DATA,
});

export const handleUserData = response => ({
  type: GET_DATA_RESPONSE, response,
});

export const signIn = data => ({
  type: SIGN_IN, data,
});

export const handleSignInData = response => ({
  type: SIGN_IN_RESPONSE, response,
});

// additional methods
export const assignAuthHeader = () => {
  axiosDefaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
};

export const getFromStorage = () => (
  JSON.parse(localStorage.getItem('userData'))
);
