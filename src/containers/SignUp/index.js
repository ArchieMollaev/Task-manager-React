import React from 'react';
import { connect } from 'react-redux';
import { signUp, loginValidator } from 'actions/Auth-actions';
import PropTypes from 'prop-types';
import SignUpForm from 'components/Forms/auth-forms/Sign-up-form';
import './style.scss';

class SignUp extends React.Component {
  state = {
    loginValidationAttempt: false,
    loginValidationStatus: false,
  }
  componentWillReceiveProps = ({ auth: { signUpData }, loginCheckout }) => {
    if (signUpData) {
      this.props.history.push('/login');
    }
    if (loginCheckout.status) {
      this.setState({ loginValidationStatus: true });
    }
    if (loginCheckout.error) {
      this.setState({ loginValidationStatus: false });
    }
  }

  toSignIn = () => {
    this.props.history.push('/login');
  }

  checkLoginAsync = ({ target }) => {
    this.setState({ loginValidationAttempt: true });
    if (target.value) {
      this.props.loginValidator({ login: target.value });
    } else {
      this.setState({ loginValidationAttempt: false });
    }
  }

  render = () => (
    <div id="auth">
      <h1>Task manager | Sign Up</h1>
      <div className="content">
        <SignUpForm
          onSubmit={(e) => { this.props.signUp(e); }}
          goToSignIn={this.toSignIn}
          validateLogin={this.checkLoginAsync}
          loginValidationAttempt={this.state.loginValidationAttempt}
          loginValidationStatus={this.state.loginValidationStatus}
      />
      </div>
    </div>
  );
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginValidator: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, loginCheckout }) => ({ auth, loginCheckout });

export default connect(mapStateToProps, { signUp, loginValidator })(SignUp);
