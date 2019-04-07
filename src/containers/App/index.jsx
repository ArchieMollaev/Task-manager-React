import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import User from '../User';
import { createBrowserHistory } from 'history';
import configureStore from 'store';

const history = createBrowserHistory();
const store = configureStore(history);

const App = () => (
  <div>
    <h1 className="main-header">
      <i className="fa fa-rocket" aria-hidden="true" />
      t.rocket
    </h1>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/:login" component={User} />
          <Redirect from="/" to="/login" />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </div>
);

export default App;
