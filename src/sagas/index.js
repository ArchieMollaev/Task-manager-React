import { all, fork } from 'redux-saga/effects';
import Auth from './auth';
import Common from './common';

export default function* root() {
  yield all([fork(Auth), fork(Common)]);
}
