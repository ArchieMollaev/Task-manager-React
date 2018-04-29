import { fork } from 'redux-saga/effects';
import Auth from './Auth-saga';
import Common from './Common-saga';

export default function* root() {
  yield [
    fork(Auth),
    fork(Common),
  ];
}
