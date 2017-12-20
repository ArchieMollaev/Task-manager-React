import { takeEvery, put, call } from 'redux-saga/effects';
import { tasksApi } from 'server/Api';
import * as constants from 'const';
import * as actions from 'actions/Task';

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
  STATUS_SWITCHED
} = constants;

const { addTask, getTasksList, deleteTask, editTask, switchStatus } = actions;

function* load() {
  const data = yield call(tasksApi.getAllTasks);
  yield put(getTasksList({ type: TASKS_LOADED, data }));
}

function* push({ status, data }) {
  yield call(tasksApi.pushTask, status, data);
  yield put(addTask({ type: TASK_PUSHED, data, status }));
}

function* update({ data, status }) {
  yield call(tasksApi.editTask, data.id, status, data);
  yield put(editTask({ type: TASK_EDITED, data, status }));
}

function* remove({ id, status }) {
  yield call(tasksApi.deleteTask, id, status);
  yield put(deleteTask({ type: TASK_DELETED, status, id }));
}

function* switcher({ id, data, currentStatus, newStatus }) {
  yield call(tasksApi.deleteTask, id, currentStatus);
  yield call(tasksApi.pushTask, newStatus, data);
  yield put(switchStatus({ type: STATUS_SWITCHED, id, data, currentStatus, newStatus }));
}

export default function* tasksSaga() {
  yield [
    takeEvery(LOAD_TASKS, load),
    takeEvery(PUSH_TASK, push),
    takeEvery(DELETE_TASK, remove),
    takeEvery(EDIT_TASK, update),
    takeEvery(SWITCH_STATUS, switcher)
  ];
  yield put(getTasksList({ type: LOAD_TASKS, data: {} }));
}
