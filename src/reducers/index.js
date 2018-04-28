import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import user from './user';
import { getList, editable, taskCreatorStatus, hoverInjector } from './task';

const reducers = combineReducers({
  user,
  getList,
  editable,
  taskCreatorStatus,
  hoverInjector,
  form: reduxFormReducer,
});

export default reducers;
