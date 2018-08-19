import { takeEvery, put, call } from 'redux-saga/effects';
import * as api from 'api/Card-api';
import * as constants from 'const';
import * as actions from 'actions/Card-actions';

const {
  CREATE_CARD,
} = constants;

const {
  createCardResponse,
} = actions;

function* createCardSaga({ data }) {
  try {
    const res = yield call(api.create, data);
    yield put(createCardResponse(res));
  } catch (err) {
    console.log(err);
  }
}




// function* load() {
//   const data = yield call(api.getAllTasks);
//   yield put(listLoaded({ data }));
// }



// function* update({ data, status }) {
//   yield put(taskEdited({ data, status }));
//   yield call(api.editTask, data.id, status, data);
// }

// function* remove({ id, status }) {
//   yield put(taskDeleted({ id, status }));
//   yield call(api.deleteTask, id, status);
// }

// function* switcher(task) {
//   yield put(statusSwitched(task.data));
//   yield call(api.updateList, task.data);
// }

// function* addNewColumn({ data }) {
//   yield call(api.addNewColumn, data);
//   yield put(columnAdded(data));
// }

// function* changeColumnName({ data }) {
//   yield call(api.renameColumn, data);
//   yield put(columnRenamed(data));
// }

// function* removeColumn({ data }) {
//   yield call(api.removeColumn, data);
//   yield put(columnRemoved(data));
// }

export default function* tasksSaga() {
  yield [
    takeEvery(CREATE_CARD, createCardSaga),
  ];
}