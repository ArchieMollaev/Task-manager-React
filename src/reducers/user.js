import * as constants from 'const';

const {
  SIGN_IN_RESPONSE,
  SIGN_UP_RESPONSE,
  GET_DATA_RESPONSE,
} = constants;

const userDataInitial = {
  data: {
    Columns: [],
  },
};

const userData = (state = userDataInitial, { type, response }) => {
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

export default userData;
