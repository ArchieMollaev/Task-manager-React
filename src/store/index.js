import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from 'reducers';
import mySaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const storeData = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(mySaga);

export default storeData;

