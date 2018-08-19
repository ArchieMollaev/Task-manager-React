import * as constants from 'const';
import { createReducer } from 'redux-create-reducer';

const {
  SIGN_IN_RESPONSE,
  SIGN_UP_RESPONSE,
  GET_DATA_RESPONSE,
  VALIDATE_LOGIN_RES,
} = constants;

const initialLogin = {
  status: false,
};

export const auth = createReducer({}, {
  [SIGN_IN_RESPONSE](state, { response }) { return response; },
  [SIGN_UP_RESPONSE](state, { response }) { return response; },
});


export const loginCheckout = createReducer(initialLogin, {
  [VALIDATE_LOGIN_RES](state, { response }) { return response; },
});

