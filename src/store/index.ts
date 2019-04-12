import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
// import { browserHistory } from 'react-router';
import reducers from '../reducers';
import mySaga from '../sagas';

const configureStore = browserHistory => {
  const sagaMiddleware = createSagaMiddleware();
  const reduxRouterMiddleware = routerMiddleware(browserHistory);

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    <any>window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? <any>window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware, reduxRouterMiddleware))
  );
  sagaMiddleware.run(mySaga);

  return store;
};

export default configureStore;
