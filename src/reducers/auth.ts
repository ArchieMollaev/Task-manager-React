import * as constants from '../const';
import { createReducer } from 'redux-create-reducer';

const { SIGN_IN, SIGN_UP, VALIDATE_LOGIN } = constants;

const initialLogin = {
  isValid: false,
  login: ''
};

export const signInData = createReducer(
  {},
  {
    [SIGN_IN.RESPONSE](state, { payload }) {
      return payload;
    }
  }
);

export const signUpData = createReducer(
  {},
  {
    [SIGN_UP.RESPONSE](state, { payload }) {
      return payload;
    }
  }
);

export const loginValidationData = createReducer(initialLogin, {
  [VALIDATE_LOGIN.RESPONSE](state, { payload }) {
    return payload;
  }
});
