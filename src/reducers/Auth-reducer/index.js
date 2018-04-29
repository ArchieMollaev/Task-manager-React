import * as constants from 'const';
import { createReducer } from 'redux-create-reducer';

const {
  SIGN_IN_RESPONSE,
  SIGN_UP_RESPONSE,
  GET_DATA_RESPONSE,
  VALIDATE_LOGIN_RES,
} = constants;

const userDataInitial = {
  data: {
    Columns: [],
  },
};

const initialLogin = {
  status: false,
}

export const auth = (state = userDataInitial, { type, response }) => {
  switch (type) {
    case SIGN_IN_RESPONSE:
      return response;
    case GET_DATA_RESPONSE:
      return { ...userDataInitial, ...response };
    case SIGN_UP_RESPONSE:
      return response;
    default:
      return state;
  }
};

export const loginCheckout = createReducer(initialLogin, {
  [VALIDATE_LOGIN_RES](state, { response }) { return response; },
});

