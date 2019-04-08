import { takeEvery, put, call, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as api from 'api/auth';
import * as constants from 'const';
import * as actions from 'actions/auth';
import axiosDefaults from 'axios/lib/defaults';

const { SIGN_IN, SIGN_UP, VALIDATE_LOGIN } = constants;

const { signIn, signUp, getUserData, validateLogin } = actions;

function setAuthorizationToken(token) {
  if (token) {
    localStorage.token = token;
  }
  axiosDefaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
}

function* fetchUserData() {
  try {
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

function* handleSignIn({ payload }) {
  try {
    yield put(signUp.response({}));
    const response = yield call(api.login, payload);
    if (!response.token) {
      yield put(signIn.response(response));
      return;
    }
    setAuthorizationToken(response.token);
    yield fetchUserData();
  } catch (err) {
    console.log(err);
  }
}

function* handleSignUp({ payload }) {
  try {
    yield put(signIn.response({}));
    const res = yield call(api.signUp, payload);
    yield put(signUp.response(res));
    yield put(push('/'));
  } catch (err) {
    console.log(err);
  }
}

function* handleLoginValidation({ payload }) {
  try {
    const res = yield call(api.validateLogin, payload);
    yield put(validateLogin.response(res));
  } catch (err) {
    console.log(err);
  }
}

function* onAppLoad() {
  if (localStorage.token) {
    setAuthorizationToken(localStorage.token);
    yield fetchUserData();
  } else {
    yield put(push('/'));
  }
}

export default function* tasksSaga() {
  yield all([
    takeEvery(SIGN_IN.REQUEST, handleSignIn),
    takeEvery(SIGN_UP.REQUEST, handleSignUp),
    // takeEvery(GET_DATA, handleUserData),
    takeEvery(VALIDATE_LOGIN.REQUEST, handleLoginValidation)
  ]);
  yield onAppLoad();
}
