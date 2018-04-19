import { takeEvery, put, call } from 'redux-saga/effects';
import * as tasksApi from 'api';
import * as constants from 'const';
import * as actions from 'actions/User';

const {
  SIGN_IN,
  GET_DATA,
} = constants;

const {
  signInResponse,
  getDataResponse,
} = actions;

function* signIn({ data }) {
  const res = yield call(tasksApi.login, data);
  yield put(signInResponse(res));
}

function* getData() {
  const data = yield call(tasksApi.getData);
  yield put(getDataResponse(data));
}

export default function* tasksSaga() {
  yield [
    takeEvery(SIGN_IN, signIn),
    takeEvery(GET_DATA, getData),
  ];
  // yield put(getTasksList({}));
}