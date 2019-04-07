import React from 'react';
import { connect } from 'react-redux';
import { signIn } from 'actions/auth';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SignInForm from 'components/Forms/auth-forms/Sign-in-form';
import './style.scss';
import { combineActions } from '../../utils/redux-utils';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.submitAttempt = false;
  }

  state = {
    message: '',
    hasError: false
  };

  componentWillMount() {
    const userData = localStorage.userData && JSON.parse(localStorage.userData);
    const login = userData && userData.login;
    if (login) {
      this.props.history.push(`${login}`);
    }
    if (this.props.auth.signUpData) {
      this.setState({ message: 'Account successfuly created. Please sign in' });
    }
  }

  componentWillReceiveProps = ({ auth: { message, redirectRoute } }) => {
    if (message) {
      this.setState({ message, hasError: true });
    }
    if (redirectRoute) {
      this.props.history.push(redirectRoute);
      this.resetWarning();
    }
  };

  toSignUp = () => {
    this.props.history.push('/signup');
  };

  resetWarning = () => {
    this.setState({ message: '', hasError: false });
  };

  render = () => (
    <div id="auth">
      <div className="content">
        {this.state.message ? (
          <div className={classNames({ message: true, 'has-error': this.state.hasError })}>
            <span>{this.state.message}</span>
          </div>
        ) : (
          <h1>Task manager | Sign In</h1>
        )}
        <SignInForm
          onSubmit={e => {
            this.props.signIn(e);
            this.submitAttempt = true;
          }}
          goToSignUp={this.toSignUp}
          hasError={this.state.hasError}
          resetWarning={this.resetWarning}
        />
      </div>
    </div>
  );
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  auth: PropTypes.shape({
    signUpData: PropTypes.shape({ login: PropTypes.string })
  })
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  combineActions({ signIn })
)(SignIn);
