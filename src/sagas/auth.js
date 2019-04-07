import { takeEvery, put, call, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as api from 'api/auth';
import * as constants from 'const';
import * as actions from 'actions/auth';
import axiosDefaults from 'axios/lib/defaults';

const { SIGN_IN, SIGN_UP, GET_DATA, VALIDATE_LOGIN } = constants;

const {
  // getUserData,
  signIn,
  signUp,
  // handleUserData,
  loginValidator
} = actions;

function* handleSignIn({ payload }) {
  try {
    console.log(payload);
    const response = yield call(api.login, payload);

    if (!response.token) {
      yield put(signIn.response(response));
      return;
    }
    localStorage.token = response.token;
    axiosDefaults.headers.common.Authorization = `Bearer ${response.token}`;

    // this.history.push(payload.login);
    yield put(push(payload.login));

    // const { data } = yield call(api.getData);
    // if (!data) {
    //   yield put(signIn.response({ data }));
    // }
    // localStorage.userData = JSON.stringify(data);
    // yield put(signIn.response({ redirectRoute: `/${data.login}` }));
    // yield put(push(`/${userDataResponse.data.login}`));
  } catch (err) {
    console.log(err);
  }
}

function* handleSignUp({ payload }) {
  try {
    const data = yield call(api.signUp, payload);
    yield put(signUp.response({ data }));
  } catch (err) {
    console.log(err);
  }
}

// function* handleUserData() {
//   try {
//     assignAuthHeader();
//     const res = yield call(api.getData);
//     setToStorage(res);
//     yield put(handleUserData(res));
//   } catch (err) {
//     console.log(err);
//   }
// }

function* handleLoginValidation({ payload }) {
  try {
    const res = yield call(api.validateLogin, payload);
    yield put(loginValidator.response(res));
  } catch (err) {
    console.log(err);
  }
}

export default function* tasksSaga() {
  yield all([
    takeEvery(SIGN_IN.REQUEST, handleSignIn),
    takeEvery(SIGN_UP.REQUEST, handleSignUp),
    // takeEvery(GET_DATA, handleUserData),
    takeEvery(VALIDATE_LOGIN.REQUEST, handleLoginValidation)
  ]);
  // yield put(getUserData());
}
