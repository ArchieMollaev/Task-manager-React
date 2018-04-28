import * as constants from 'const';

const {
  SIGN_IN_RESPONSE,
  GET_DATA_RESPONSE,
} = constants;

const signInInitial = { token: '' };
const userDataInitial = {
  data: {
    Columns: [],
  },
};

const userData = (state = { ...signInInitial, ...userDataInitial }, { type, response }) => {
  switch (type) {
    case SIGN_IN_RESPONSE:
      return response.token ? response : signInInitial;
    case GET_DATA_RESPONSE:
      return response.data ? response : { ...userDataInitial, meta: response.message || 'unexpected error' };
    default:
      return state;
  }
};

export default userData;
