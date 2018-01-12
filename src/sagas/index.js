import { takeEvery, put, call } from 'redux-saga/effects';
import { tasksApi } from 'api';
import * as constants from 'const';
import * as actions from 'actions/Task';

const {
  LOAD_TASKS,
  PUSH_TASK,
  EDIT_TASK,
  DELETE_TASK,
  SWITCH_STATUS,
} = constants;

const {
  getTasksList,
  listLoaded,
  taskAded,
  taskDeleted,
  taskEdited,
  statusSwitched,
} = actions;

const noSpace = target => target.replace(' ', '');

function* load() {
  const data = yield call(tasksApi.getAllTasks);
  yield put(listLoaded({ data }));
}

function* push({ status, data }) {
  yield put(taskAded({ data, status }));
  yield call(tasksApi.pushTask, noSpace(status), data);
}

function* update({ data, status }) {
  yield put(taskEdited({ data, status }));
  yield call(tasksApi.editTask, data.id, noSpace(status), data);
}

function* remove({ id, status }) {
  yield put(taskDeleted({ id, status }));
  yield call(tasksApi.deleteTask, id, noSpace(status));
}

function* switcher({ id, data, currentStatus, newStatus }) {
  yield put(statusSwitched({ id, data, currentStatus, newStatus }));
  yield call(tasksApi.deleteTask, id, noSpace(currentStatus));
  yield call(tasksApi.pushTask, noSpace(newStatus), data);
}

// function* addNewColumn(data) {
//   // yield put(taskDeleted({ id, status }));
//   yield call(tasksApi.addNewColumn, data);
// }

export default function* tasksSaga() {
  yield [
    takeEvery(LOAD_TASKS, load),
    takeEvery(PUSH_TASK, push),
    takeEvery(DELETE_TASK, remove),
    takeEvery(EDIT_TASK, update),
    takeEvery(SWITCH_STATUS, switcher),
  ];
  yield put(getTasksList({}));
}
