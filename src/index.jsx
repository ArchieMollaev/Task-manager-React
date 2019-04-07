import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import storeData from 'store';
import 'styles/main.scss';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import App from './containers/App';

ReactDOM.render(
  <div>
    <h1 className="main-header">
      <i className="fa fa-rocket" aria-hidden="true" />
      t.rocket
    </h1>
    <Provider store={storeData}>
      <Router>
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/:login" component={App} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);
