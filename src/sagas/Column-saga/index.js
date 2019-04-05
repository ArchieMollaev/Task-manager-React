import { takeFirst, put, call } from 'redux-saga/effects';
import { ADD_COLUMN } from 'const';
import { addNewColumn } from 'api/Column-api';
import { addColumn } from 'actions/Column-actions';

function* createColumn({ payload }) {
  try {
    const response = yield call(addNewColumn, payload);
    if (response.id) {
      put(addColumn(response));
    }
  } catch (err) {
    console.log(err.message);
  }
}

export default function*() {
  yield [takeFirst(ADD_COLUMN, createColumn)];
}
