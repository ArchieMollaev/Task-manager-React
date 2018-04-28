import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from 'containers/App';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import storeData from 'store';
import 'styles/main.scss';

ReactDOM.render(
  <Provider store={storeData}>
    <Router>
      <Switch>
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route exact path="/:login" component={App} />
        <Redirect from="/" to="/signIn" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

