import * as constants from 'const'
const {
  SET_EDITABLE,
} = constants;

export const getTasksList = ({ type, data }) => ({
  type, data
})

export const addTask = ({ type, data, status }) => ({
  type, data, status
})

export const editTask = ({ type, data, status }) => ({
  type, data, status
})

export const deleteTask = ({ type, status, id }) => ({
  type, status, id
})

export const switchStatus = ({ type, data, id, currentStatus, newStatus }) => ({
  type, id, data, currentStatus, newStatus
})

export const setEditable = (id) => ({
  type: SET_EDITABLE,
  id
})