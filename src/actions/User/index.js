import * as constants from 'const';

const {
  SIGN_IN,
  SIGN_IN_RESPONSE,
  GET_DATA,
  GET_DATA_RESPONSE,
} = constants;

export const signIn = data => ({
  type: SIGN_IN, data,
});

export const signInResponse = data => ({
  type: SIGN_IN_RESPONSE, data,
});

export const getData = () => ({
  type: GET_DATA,
});

export const getDataResponse = data => ({
  type: GET_DATA_RESPONSE, data,
});
