import React from 'react';
import { connect } from 'react-redux';
import { signIn, getUserData, getFromStorage } from 'actions/Auth-actions';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SignInForm from 'components/Forms/auth-forms/Sign-in-form';
import './style.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.submitAttempt = false;
  }
  state = {
    message: '',
    hasError: false,
  }
  componentWillMount() {
    if (this.props.auth.signUpData) {
      this.setState({ message: 'Account successfuly created. Please sign in' });
    }
    this.checkState();
  }

  componentWillReceiveProps = ({ auth: { token, error, message } }) => {
    if (token) {
      this.props.getUserData();
    }
    if (error && this.submitAttempt) {
      this.setState({ message });
      this.setState({ hasError: true });
    }
    this.submitAttempt = false;
    this.checkState();
  }

  checkState = () => {
    const userData = getFromStorage();
    if (userData) {
      this.props.history.push(`/${userData.login.replace(' ', '')}`);
    }
  }

  toSignUp = () => {
    this.props.history.push('/signup');
  }

  resetErrorStyle = () => {
    this.setState({ message: '' });
    this.setState({ hasError: false });
  }

  render = () => (
    <div id="auth">
      <div className="content">
        { this.state.message ?
          <div className={ classNames({ message: true, 'has-error': this.state.hasError })}>
            <span>{ this.state.message }</span>
          </div>
          : <h1>Task manager | Sign In</h1>
        }
        <SignInForm
          onSubmit={(e) => { this.props.signIn(e); this.submitAttempt = true; }}
          goToSignUp={this.toSignUp}
          hasError={this.state.hasError}
          resetErrorStyle={this.resetErrorStyle}
        />
      </div>
    </div>
  );
}

SignIn.propTypes = {
  getUserData: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { signIn, getUserData })(SignIn);
