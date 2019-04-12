import { takeEvery, put, call, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as api from '../api/auth';
import { SIGN_IN, SIGN_UP, VALIDATE_LOGIN } from '../const';
import { signIn, signUp, validateLogin } from '../actions/auth';
import { fetchUserData } from './common';

function* handleSignIn({ payload }) {
  try {
    yield put(signUp.response({}));
    const response = yield call(api.login, payload);
    if (!response.token) {
      yield put(signIn.response(response));
      return;
    }
    localStorage.token = response.token;
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

export default function*() {
  yield all([
    takeEvery(SIGN_IN.REQUEST, handleSignIn),
    takeEvery(SIGN_UP.REQUEST, handleSignUp),
    takeEvery(VALIDATE_LOGIN.REQUEST, handleLoginValidation)
  ]);
}
