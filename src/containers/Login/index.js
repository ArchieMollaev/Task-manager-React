import React from 'react';
import { connect } from 'react-redux';
import { signIn, getData } from 'actions/User';
import PropTypes from 'prop-types';
import LogIn from 'components/Forms/LogIn';
import CheckIn from 'components/Forms/CheckIn';
import './style.scss';

class Login extends React.Component {
  state = {
    btn: 'registration',
  }
  componentWillReceiveProps = ({ userData }) => {
    if (userData.token) {
      localStorage.setItem('token', userData.token);
      this.props.getData();
    } else if (userData.data) {
      this.props.history.push(`/${userData.data.login}`);
    }
  }

  currentWindow = () => {
    if (this.props.location.pathname === '/login') return <LogIn onSubmit={ (e) => { this.props.signIn(e) } } />;
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

export default connect(mapStateToProps, { signIn, getData })(Login);
