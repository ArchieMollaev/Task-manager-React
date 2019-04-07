import { takeEvery, put, call } from 'redux-saga/effects';
import * as api from 'api/common';
import * as auth from 'api/auth';
import {
  LOAD_TASKS,
  PUSH_TASK,
  EDIT_TASK,
  DELETE_TASK,
  SWITCH_STATUS,
  ADD_COLUMN,
  REMOVE_COLUMN,
  CHANGE_COLUMN_NAME
} from 'const';
import * as actions from 'actions/common';
import axiosDefaults from 'axios/lib/defaults';

const {
  getTasksList,
  addTask,
  editTask,
  deleteTask,
  switchStatus,
  addColumn,
  removeColumn,
  renameColumn
} = actions;

function* createCard({ status, data }) {
  const taskData = { ...data, id: Date.now() };
  yield put(addTask.response({ taskData, status }));
  yield call(api.pushTask, status, taskData);
}

function* load() {
  axiosDefaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
  const data = yield call(auth.getData);
  yield put(getTasksList.response({ data }));
}

function* update({ data, status }) {
  yield put(editTask.response({ data, status }));
  yield call(api.editTask, data.id, status, data);
}

function* remove({ id, status }) {
  yield put(deleteTask.response({ id, status }));
  yield call(api.deleteTask, id, status);
}

function* switcher(task) {
  yield put(switchStatus.response(task.data));
  yield call(api.updateList, task.data);
}

function* addNewColumn({ payload }) {
  yield call(api.addNewColumn, payload);
  yield put(addColumn.response(payload));
}

function* changeColumnName({ data }) {
  yield call(api.renameColumn, data);
  yield put(renameColumn.response(data));
}

function* deleteColumn({ data }) {
  yield call(api.removeColumn, data);
  yield put(removeColumn.response(data));
}

export default function* tasksSaga() {
  yield [
    takeEvery(PUSH_TASK.REQUEST, createCard),
    takeEvery(LOAD_TASKS.REQUEST, load),
    takeEvery(DELETE_TASK.REQUEST, remove),
    takeEvery(EDIT_TASK.REQUEST, update),
    takeEvery(SWITCH_STATUS.REQUEST, switcher),
    takeEvery(ADD_COLUMN.REQUEST, addNewColumn),
    takeEvery(CHANGE_COLUMN_NAME.REQUEST, changeColumnName),
    takeEvery(REMOVE_COLUMN.REQUEST, deleteColumn)
  ];
  yield load();
}
