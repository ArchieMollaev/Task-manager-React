import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as api from '../api/common';
import { push } from 'react-router-redux';
import {
  PUSH_TASK,
  EDIT_TASK,
  DELETE_TASK,
  SWITCH_STATUS,
  ADD_COLUMN,
  REMOVE_COLUMN,
  CHANGE_COLUMN_NAME
} from '../const';
import {
  addTask,
  editTask,
  deleteTask,
  switchStatus,
  addColumn,
  removeColumn,
  renameColumn,
  getUserData
} from '../actions/common';
import axiosDefaults from 'axios/lib/defaults';

function* createTask({ payload }) {
  try {
    const res = yield call(api.createTask, payload);
    console.log('res', res);
    yield put(addTask.response(res));
  } catch (err) {
    console.log(err.message);
  }
}

function* updateTask({ payload }) {
  try {
    const res = yield call(api.updateTask, payload);
    console.log('res----', res);
    yield put(editTask.response(res));
  } catch (err) {
    console.log(err.message);
  }
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
  const res = yield call(api.addNewColumn, payload);
  yield put(addColumn.response(res));
}

function* changeColumnName({ data }) {
  yield call(api.renameColumn, data);
  yield put(renameColumn.response(data));
}

function* deleteColumn({ data }) {
  yield call(api.removeColumn, data);
  yield put(removeColumn.response(data));
}

export function* fetchUserData() {
  try {
    axiosDefaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
    const res = yield call(api.getData);
    if (res.error) {
      throw new Error(res.message);
    }
    yield put(getUserData.response(res));
    yield put(push(res.login));
  } catch ({ message }) {
    yield put(push('/'));
    localStorage.clear();
    console.log(message);
  }
}

function* onAppLoad() {
  if (localStorage.token) {
    yield fetchUserData();
  } else {
    yield put(push('/'));
  }
}

export default function*() {
  yield all([
    takeEvery(PUSH_TASK.REQUEST, createTask),
    takeEvery(EDIT_TASK.REQUEST, updateTask),
    takeEvery(DELETE_TASK.REQUEST, remove),
    takeEvery(SWITCH_STATUS.REQUEST, switcher),
    takeEvery(ADD_COLUMN.REQUEST, addNewColumn),
    takeEvery(CHANGE_COLUMN_NAME.REQUEST, changeColumnName),
    takeEvery(REMOVE_COLUMN.REQUEST, deleteColumn)
  ]);

  yield onAppLoad();
}
