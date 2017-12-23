import * as constants from 'const'
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
  TASK_CREATOR_STATUS
} = constants;

export const getTasksList = ({ data }) => ({
  type: LOAD_TASKS, data
})

export const listLoaded = ({ data }) => ({
  type: TASKS_LOADED, data
})

export const addTask = ({ data, status }) => ({
  type: PUSH_TASK, data, status
})

export const taskAded = ({ data, status }) => ({
  type: TASK_PUSHED, data, status
})

export const editTask = ({ data, status }) => ({
  type: EDIT_TASK, data, status
})

export const taskEdited = ({ data, status }) => ({
  type: TASK_EDITED, data, status
})

export const deleteTask = ({ status, id }) => ({
  type: DELETE_TASK, status, id
})

export const taskDeleted = ({ status, id }) => ({
  type: TASK_DELETED, status, id
})

export const switchStatus = ({ data, id, currentStatus, newStatus }) => ({
  type: SWITCH_STATUS, id, data, currentStatus, newStatus
})

export const statusSwitched = ({ data, id, currentStatus, newStatus }) => ({
  type: STATUS_SWITCHED, id, data, currentStatus, newStatus
})

export const setEditable = (id) => ({
  type: SET_EDITABLE,
  id
})

export const taskCreatorStatus = (value) => ({
  type: TASK_CREATOR_STATUS,
  data: value
})