import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import userData from './user';
import { getList, editable, taskCreatorStatus, hoverInjector } from './task';

const reducers = combineReducers({
  userData,
  getList,
  editable,
  taskCreatorStatus,
  hoverInjector,
  form: reduxFormReducer,
});

export default reducers;
