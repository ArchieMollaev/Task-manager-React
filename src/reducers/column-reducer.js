import { COLUMN_ADDED } from 'const';
import { createReducer } from 'redux-create-reducer';

const userDataInitial = {
  data: {
    Columns: [],
  },
};

export default createReducer(userDataInitial, {
  [COLUMN_ADDED](state, { payload }) {
    console.log(payload);
    return {};
  },
});
