import * as React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/auth';
import classNames from 'classnames';
import SignInForm from '../../components/Forms/auth-forms/Sign-in-form';
import './style.scss';
import { combineActions } from '../../utils/redux-utils';

class SignIn extends React.Component {
  get message() {
    return (
      (this.props.signInMessage || this.props.singnUpSuccess) && (
        <div className={classNames('message', { 'has-error': !!this.props.signInMessage })}>
          <span>{this.props.signInMessage || 'User successfully created! Please login'}</span>
        </div>
      )
    );
  }

  moveToSignUp = () => {
    this.props.history.push('/signup');
  };

  render = () => {
    const { onSubmit } = this.props;
    return (
      <div id="auth">
        <div className="content">
          {this.message || <h1>Task manager | Sign In</h1>}
          <SignInForm
            onSubmit={onSubmit}
            goToSignUp={this.moveToSignUp}
            hasError={!!this.errorMessage}
          />
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ signUpData, signInData }) => ({
  signInMessage: signInData.message,
  singnUpSuccess: signUpData.status === 'SUCCESS'
});

export default connect(
  mapStateToProps,
  combineActions({ onSubmit: signIn })
)(SignIn);
