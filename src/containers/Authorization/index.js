import React from 'react';
import PropTypes from 'prop-types';
import LogIn from 'components/Forms/LogIn';
import CheckIn from 'components/Forms/CheckIn';
import './style.scss';

class Authorization extends React.Component {
  state = {
    btn: 'registration',
  }

  render = () => {
    const {
      location,
      match,
      history,
    } = this.props;

    const currentWindow = () => (
      location.pathname === '/login' &&
      <LogIn /> ||
      location.pathname === '/login/registration' &&
      <CheckIn />
    )
  
    const changeView = () => {
      if (location.pathname === '/login') {
        history.push(`${match.url}/registration`);
        this.setState({ btn: 'back' });
      } else {
        history.push('/login');
        this.setState({ btn: 'registration' });
      }
    }
    return (
      <div id="authorization">
        {currentWindow()}
        <button type="button" onClick={() => changeView()}>{this.state.btn}</button>
      </div>
    )
  }
}

Authorization.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Authorization;
