import * as constants from 'const';

const {
  SIGN_IN_RESPONSE,
  GET_DATA_RESPONSE,
} = constants;

const userData = (state = {}, { type, data }) => {
  switch (type) {
    case SIGN_IN_RESPONSE:
      return data;
    case GET_DATA_RESPONSE:
      console.log(data);
      return data;
    default:
      return state;
  }
};

export default userData;
