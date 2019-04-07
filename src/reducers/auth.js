import * as constants from 'const';
import { createReducer } from 'redux-create-reducer';

const { SIGN_IN, SIGN_UP, GET_DATA, VALIDATE_LOGIN } = constants;

const initialLogin = {
  status: false
};

export const auth = createReducer(
  {},
  {
    [SIGN_IN.RESPONSE](state, { payload }) {
      return payload;
    },
    [SIGN_UP.RESPONSE](state, { payload }) {
      return payload.data;
    }
  }
);

export const loginCheckout = createReducer(initialLogin, {
  [VALIDATE_LOGIN.RESPONSE](state, { payload }) {
    return payload;
  }
});
