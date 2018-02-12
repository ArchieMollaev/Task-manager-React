import * as constants from 'const';

const {
  LOAD_TASKS,
  TASKS_LOADED,
  PUSH_TASK,
  TASK_PUSHED,
  EDIT_TASK,
  TASK_EDITED,
  DELETE_TASK,
  TASK_DELETED,
  SWITCH_STATUS,
  STATUS_SWITCHED,
  SET_EDITABLE,
  TASK_CREATOR_STATUS,
  ADD_COLUMN,
  COLUMN_ADDED,
  REMOVE_COLUMN,
  COLUMN_REMOVED,
  CHANGE_COLUMN_NAME,
  COLUMN_NAME_CHANGED,
  HOVER_ELEMENT,
} = constants;

export const getTasksList = ({ data }) => ({
  type: LOAD_TASKS, data,
});

export const listLoaded = ({ data }) => ({
  type: TASKS_LOADED, data,
});

export const addTask = ({ data, status }) => ({
  type: PUSH_TASK, data, status,
});

export const taskPushed = ({ taskData, status }) => ({
  type: TASK_PUSHED,
  data: taskData,
  status,
});

export const editTask = ({ data, status }) => ({
  type: EDIT_TASK, data, status,
});

export const taskEdited = ({ data, status }) => ({
  type: TASK_EDITED, data, status,
});

export const deleteTask = ({ status, id }) => ({
  type: DELETE_TASK, status, id,
});

export const taskDeleted = ({ status, id }) => ({
  type: TASK_DELETED, status, id,
});

export const switchStatus = data => ({
  type: SWITCH_STATUS, data,
});

export const statusSwitched = data => ({
  type: STATUS_SWITCHED, data,
});

export const setEditable = id => ({
  type: SET_EDITABLE, id,
});

export const taskCreatorStatus = data => ({
  type: TASK_CREATOR_STATUS, data,
});

export const addColumn = data => ({
  type: ADD_COLUMN, data,
});

export const renameColumn = data => ({
  type: CHANGE_COLUMN_NAME, data,
});

export const columnRenamed = data => ({
  type: COLUMN_NAME_CHANGED, data,
});

export const columnAdded = data => ({
  type: COLUMN_ADDED, data,
});

export const removeColumn = data => ({
  type: REMOVE_COLUMN, data,
});

export const columnRemoved = data => ({
  type: COLUMN_REMOVED, data,
});

export const hoverInjector = data => ({
  type: HOVER_ELEMENT, data,
});

