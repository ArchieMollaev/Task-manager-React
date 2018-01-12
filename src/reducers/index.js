import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { getList, editable, taskCreatorStatus } from './tasks';

const reducers = combineReducers({
  getList,
  editable,
  taskCreatorStatus,
  form: reduxFormReducer,
});

export default reducers;
