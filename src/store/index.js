import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from 'reducers'
import mySaga from '../sagas'

const sagaMiddleware = createSagaMiddleware();
const storeData = createStore(
	reducers,
	compose(applyMiddleware(sagaMiddleware),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);

sagaMiddleware.run(mySaga);

export default storeData;

