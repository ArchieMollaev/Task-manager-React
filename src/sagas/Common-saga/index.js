import { takeEvery, put, call } from 'redux-saga/effects';
import * as api from 'api/Common-api';
import * as constants from 'const';
import * as actions from 'actions/Common-actions';

const {
  LOAD_TASKS,
  PUSH_TASK,
  EDIT_TASK,
  DELETE_TASK,
  SWITCH_STATUS,
  ADD_COLUMN,
  REMOVE_COLUMN,
  CHANGE_COLUMN_NAME,
} = constants;

const {
//   getTasksList,
  listLoaded,
  taskPushed,
  taskDeleted,
  taskEdited,
  statusSwitched,
  columnAdded,
  columnRemoved,
  columnRenamed,
} = actions;

function* load() {
  const data = yield call(api.getAllTasks);
  yield put(listLoaded({ data }));
}

function* push({ status, data }) {
  const taskData = { ...data, id: Date.now() };
  yield put(taskPushed({ taskData, status }));
  yield call(api.pushTask, status, taskData);
}

function* update({ data, status }) {
  yield put(taskEdited({ data, status }));
  yield call(api.editTask, data.id, status, data);
}

function* remove({ id, status }) {
  yield put(taskDeleted({ id, status }));
  yield call(api.deleteTask, id, status);
}

function* switcher(task) {
  yield put(statusSwitched(task.data));
  yield call(api.updateList, task.data);
}

function* addNewColumn({ data }) {
  yield call(api.addNewColumn, data);
  yield put(columnAdded(data));
}

function* changeColumnName({ data }) {
  yield call(api.renameColumn, data);
  yield put(columnRenamed(data));
}

function* removeColumn({ data }) {
  yield call(api.removeColumn, data);
  yield put(columnRemoved(data));
}

export default function* tasksSaga() {
  yield [
    takeEvery(LOAD_TASKS, load),
    takeEvery(PUSH_TASK, push),
    takeEvery(DELETE_TASK, remove),
    takeEvery(EDIT_TASK, update),
    takeEvery(SWITCH_STATUS, switcher),
    takeEvery(ADD_COLUMN, addNewColumn),
    takeEvery(CHANGE_COLUMN_NAME, changeColumnName),
    takeEvery(REMOVE_COLUMN, removeColumn),
  ];
  // yield put(getTasksList({}));
}