import { fork } from 'redux-saga/effects';
import Auth from './auth';
import Common from './common';

export default function* root() {
  yield [fork(Auth), fork(Common)];
}
