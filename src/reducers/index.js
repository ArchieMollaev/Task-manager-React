import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { getList, editable, taskCreatorStatus, hoverInjector } from './tasks';

const reducers = combineReducers({
  getList,
  editable,
  taskCreatorStatus,
  hoverInjector,
  form: reduxFormReducer,
});

export default reducers;
