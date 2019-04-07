import { takeEvery, put, call } from 'redux-saga/effects';
import * as api from 'api/auth';
import * as constants from 'const';
import * as actions from 'actions/auth';
import axiosDefaults from 'axios/lib/defaults';

const { SIGN_IN, SIGN_UP, GET_DATA, VALIDATE_LOGIN } = constants;

const {
  getUserData,
  handleSignInData,
  handleSignUpData,
  // handleUserData,
  handleLoginValidator
} = actions;

function* handleSignIn({ data }) {
  try {
    const tokenResponse = yield call(api.login, data);
    if (!tokenResponse.token) {
      yield put(handleSignInData(tokenResponse));
      return;
    }
    localStorage.token = tokenResponse.token;
    axiosDefaults.headers.common['Authorization'] = `Bearer ${tokenResponse.token}`;

    const userDataResponse = yield call(api.getData);
    if (!userDataResponse.data) {
      yield put(handleSignInData(userDataResponse));
    }
    localStorage.userData = JSON.stringify(userDataResponse.data);
    yield put(handleSignInData({ redirectRoute: `/${userDataResponse.data.login}` }));
    // yield put(push(`/${userDataResponse.data.login}`));
  } catch (err) {
    console.log(err);
  }
}

function* handleSignUp({ data }) {
  try {
    const res = yield call(api.signUp, data);
    yield put(handleSignUpData(res));
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

function* handleLoginValidation({ data }) {
  try {
    const res = yield call(api.validateLogin, data);
    yield put(handleLoginValidator(res));
  } catch (err) {
    console.log(err);
  }
}

export default function* tasksSaga() {
  yield [
    takeEvery(SIGN_IN, handleSignIn),
    takeEvery(SIGN_UP, handleSignUp),
    // takeEvery(GET_DATA, handleUserData),
    takeEvery(VALIDATE_LOGIN, handleLoginValidation)
  ];
  yield put(getUserData());
}
