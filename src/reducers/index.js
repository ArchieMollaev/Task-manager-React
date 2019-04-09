import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { signInData, signUpData, loginValidationData } from './auth';
import { activeColumnId, taskCreatorStatus, columns, hoverInjector } from './common';

const reducers = combineReducers({
  signInData,
  signUpData,
  columns,
  loginValidationData,
  // ui
  activeColumnId,
  taskCreatorStatus,
  hoverInjector,
  form: reduxFormReducer
});

export default reducers;
