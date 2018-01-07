import { takeEvery, put, call } from 'redux-saga/effects';
import { tasksApi } from 'api';
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

const { getTasksList,
        listLoaded,
        addTask,
        taskAded, 
        deleteTask,
        taskDeleted,
        editTask,
        taskEdited,
        switchStatus,
        statusSwitched
 } = actions;

function* load() {
  const data = yield call(tasksApi.getAllTasks);
  yield put(listLoaded({ data }));
}

function* push({ status, data }) {
  yield put(taskAded({ data, status }));
  yield call(tasksApi.pushTask, status, data);
}

function* update({ data, status }) {
  yield put(taskEdited({ data, status }));
  yield call(tasksApi.editTask, data.id, status, data);
}

function* remove({ id, status }) {
  yield put(taskDeleted({ id, status }));
  yield call(tasksApi.deleteTask, id, status);
}

function* switcher({ id, data, currentStatus, newStatus }) {
  yield put(statusSwitched({ id, data, currentStatus, newStatus }));
  yield call(tasksApi.deleteTask, id, currentStatus);
  yield call(tasksApi.pushTask, newStatus, data);
}

export default function* tasksSaga() {
  yield [
    takeEvery(LOAD_TASKS, load),
    takeEvery(PUSH_TASK, push),
    takeEvery(DELETE_TASK, remove),
    takeEvery(EDIT_TASK, update),
    takeEvery(SWITCH_STATUS, switcher)
  ];
  yield put(getTasksList({}));
}
