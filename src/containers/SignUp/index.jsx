import React from 'react';
import { connect } from 'react-redux';
import { signUp, validateLogin } from 'actions/auth';
import PropTypes from 'prop-types';
import SignUpForm from 'components/Forms/auth-forms/Sign-up-form';
import './style.scss';
import { combineActions } from '../../utils/redux-utils';

class SignUp extends React.Component {
  moveToSignIn = () => {
    this.props.history.push('/login');
  };

  render = () => (
    <div id="auth">
      <h1>Task manager | Sign Up</h1>
      <div className="content">
        <SignUpForm
          onSubmit={e => {
            this.props.signUp(e);
          }}
          goToSignIn={this.moveToSignIn}
          validateLogin={this.props.validateLogin}
          loginValidationData={this.props.loginValidationData}
        />
      </div>
    </div>
  );
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  validateLogin: PropTypes.func.isRequired,
  loginValidationData: PropTypes.shape({
    error: PropTypes.string
  })
};

SignUp.defaultProps = {
  loginValidationData: undefined
};

const mapStateToProps = ({ auth, loginValidationData }) => ({ auth, loginValidationData });

export default connect(
  mapStateToProps,
  combineActions({ signUp, validateLogin })
)(SignUp);
