import React from 'react';
import { connect } from 'react-redux';
import { signIn, getUserData, getFromStorage } from 'actions/User';
import PropTypes from 'prop-types';
import LogIn from 'components/Forms/LogIn';
import CheckIn from 'components/Forms/CheckIn';
import './style.scss';

class Login extends React.Component {
  state = {
    btn: 'registration',
  }
  componentWillMount() {
    this.checkState();
  }

  componentWillReceiveProps = ({ userData }) => {
    if (userData.token) {
      this.props.getUserData();
    }
    this.checkState();
  }

  checkState = () => {
    const userData = getFromStorage();
    if (userData) {
      this.props.history.push(`/${userData.login}`);
    }
  }

  currentWindow = () => {
    if (this.props.location.pathname === '/login') return <LogIn onSubmit={(e) => { this.props.signIn(e); }} />;
    if (this.props.location.pathname === '/login/registration') return <CheckIn />;
  };

  changeView = () => {
    if (this.props.location.pathname === '/login') {
      this.props.history.push(`${this.props.match.url}/registration`);
      this.setState({ btn: 'back' });
    } else {
      this.props.history.push('/login');
      this.setState({ btn: 'registration' });
    }
  };

  render = () => (
    <div id="authorization">
      {this.currentWindow()}
      <button type="button" onClick={ this.changeView }>{this.state.btn}</button>
    </div>
  );
}

Login.propTypes = {
  getUserData: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
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

const mapStateToProps = ({ userData }) => ({ userData });

export default connect(mapStateToProps, { signIn, getUserData })(Login);
