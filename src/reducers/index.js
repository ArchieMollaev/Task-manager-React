import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { signInData, signUpData, userData, loginValidationData } from './auth';
import { getList, editable, taskCreatorStatus, hoverInjector } from './common';

const reducers = combineReducers({
  signInData,
  signUpData,
  userData,
  loginValidationData,
  getList,
  editable,
  taskCreatorStatus,
  hoverInjector,
  form: reduxFormReducer
});

export default reducers;
