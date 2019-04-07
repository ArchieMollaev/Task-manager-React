import { takeEvery, put, call } from 'redux-saga/effects';
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
    const tokenResponse = yield call(api.login, payload);
    if (!tokenResponse.token) {
      yield put(signIn.response({ tokenResponse }));
      return;
    }
    localStorage.token = tokenResponse.token;
    axiosDefaults.headers.common.Authorization = `Bearer ${tokenResponse.token}`;

    const { data } = yield call(api.getData);
    if (!data) {
      yield put(signIn.response({ data }));
    }
    localStorage.userData = JSON.stringify(data);
    yield put(signIn.response({ redirectRoute: `/${data.login}` }));
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
  yield [
    takeEvery(SIGN_IN.REQUEST, handleSignIn),
    takeEvery(SIGN_UP.REQUEST, handleSignUp),
    // takeEvery(GET_DATA, handleUserData),
    takeEvery(VALIDATE_LOGIN.REQUEST, handleLoginValidation)
  ];
  // yield put(getUserData());
}
