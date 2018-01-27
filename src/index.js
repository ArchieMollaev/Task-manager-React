import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from 'containers/App';
import Login from 'containers/Login';
import storeData from 'store';
import 'styles/main.scss';

ReactDOM.render(
  <Provider store={storeData}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/ID:userid" component={App} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

