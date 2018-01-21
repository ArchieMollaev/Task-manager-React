import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserInterface from 'containers/UserInterface';
import Authorization from 'containers/Authorization';
import storeData from 'store';
import 'styles/main.scss';

ReactDOM.render(
  <Provider store={storeData}>
    <Router>
      <Switch>
        <Route path="/login" component={Authorization} />
        <Route exact path="/ID:userID" component={UserInterface} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

