import {
  LOAD_TASKS,
  PUSH_TASK,
  EDIT_TASK,
  DELETE_TASK,
  SWITCH_STATUS,
  SET_EDITABLE,
  TASK_CREATOR_STATUS,
  ADD_COLUMN,
  REMOVE_COLUMN,
  CHANGE_COLUMN_NAME,
  HOVER_ELEMENT
} from 'const';
import { buildHttpActionCreators } from '../utils/redux-utils';

export const getTasksList = buildHttpActionCreators(LOAD_TASKS);
export const addTask = buildHttpActionCreators(PUSH_TASK);
export const editTask = buildHttpActionCreators(EDIT_TASK);
export const deleteTask = buildHttpActionCreators(DELETE_TASK);
export const switchStatus = buildHttpActionCreators(SWITCH_STATUS);
export const addColumn = buildHttpActionCreators(ADD_COLUMN);
export const renameColumn = buildHttpActionCreators(CHANGE_COLUMN_NAME);
export const removeColumn = buildHttpActionCreators(REMOVE_COLUMN);

export const hoverInjector = payload => ({
  type: HOVER_ELEMENT,
  payload
});

export const setEditable = payload => ({
  type: SET_EDITABLE,
  payload
});

export const taskCreatorStatus = payload => ({
  type: TASK_CREATOR_STATUS,
  payload
});
