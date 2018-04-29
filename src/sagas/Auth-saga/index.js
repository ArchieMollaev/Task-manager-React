import { takeEvery, put, call } from 'redux-saga/effects';
import * as api from 'api/Auth-api';
import * as constants from 'const';
import * as actions from 'actions/Auth-actions';

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
    const res = yield call(api.login, data);
    setToStorage(res);
    yield put(handleSignInData(res));
  } catch (err) {
    console.log(err);
  }
}

function* signUpSaga({ data }) {
  try {
    const res = yield call(api.signUp, data);
    yield put(handleSignUpData(res));
  } catch (err) {
    console.log(err);
  }
}

function* getUserDataSaga() {
  try {
    assignAuthHeader();
    const res = yield call(api.getData);
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
