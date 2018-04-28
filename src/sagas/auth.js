import { takeEvery, put, call } from 'redux-saga/effects';
import axiosDefaults from 'axios/lib/defaults';
import * as tasksApi from 'api';
import * as constants from 'const';
import * as actions from 'actions/User';

const {
  SIGN_IN,
  GET_DATA,
} = constants;

const {
  getUserData,
  handleSignInData,
  handleUserData,
  assignAuthHeader,
} = actions;

function* signInSaga({ data }) {
  const res = yield call(tasksApi.login, data);
  if (res.token) { localStorage.setItem('token', res.token); }
  yield put(handleSignInData(res));
}

function* getUserDataSaga() {
  assignAuthHeader();
  const res = yield call(tasksApi.getData);
  if (res.data) {
    localStorage.setItem('userData', JSON.stringify({ login: res.data.login }));
  }
  yield put(handleUserData(res));
}

export default function* tasksSaga() {
  yield [
    takeEvery(SIGN_IN, signInSaga),
    takeEvery(GET_DATA, getUserDataSaga),
  ];
  yield put(getUserData());
}
