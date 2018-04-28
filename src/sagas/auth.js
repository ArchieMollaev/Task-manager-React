import { takeEvery, put, call } from 'redux-saga/effects';
import * as tasksApi from 'api';
import * as constants from 'const';
import * as actions from 'actions/User';

const {
  SIGN_IN,
  SIGN_UP,
  GET_DATA,
} = constants;

const {
  getUserData,
  handleSignInData,
  handleSignUpData,
  handleUserData,
  assignAuthHeader,
  setToStorage,
} = actions;

function* signInSaga({ data }) {
  try {
    const res = yield call(tasksApi.login, data);
    setToStorage(res);
    yield put(handleSignInData(res));
  } catch (err) {
    console.log(err);
  }
}

function* signUpSaga({ data }) {
  try {
    console.log(data);
    const res = yield call(tasksApi.signUp, data);
    yield put(handleSignUpData(res));
  } catch (err) {
    console.log(err);
  }
}

function* getUserDataSaga() {
  try {
    assignAuthHeader();
    const res = yield call(tasksApi.getData);
    setToStorage(res);
    yield put(handleUserData(res));
  } catch (err) {
    console.log(err);
  }
}

export default function* tasksSaga() {
  yield [
    takeEvery(SIGN_IN, signInSaga),
    takeEvery(SIGN_UP, signUpSaga),
    takeEvery(GET_DATA, getUserDataSaga),
  ];
  yield put(getUserData());
}
