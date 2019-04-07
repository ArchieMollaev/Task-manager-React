import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { auth, loginCheckout } from './auth';
import { getList, editable, taskCreatorStatus, hoverInjector } from './common';

const reducers = combineReducers({
  auth,
  loginCheckout,
  getList,
  editable,
  taskCreatorStatus,
  hoverInjector,
  form: reduxFormReducer
});

export default reducers;
