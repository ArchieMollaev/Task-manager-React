import { fork } from 'redux-saga/effects';
import Auth from './Auth-saga';
import Card from './Card-saga';
import ColumnSaga from './Column-saga';

export default function* root() {
  yield [fork(Auth), fork(ColumnSaga), fork(Card)];
}
