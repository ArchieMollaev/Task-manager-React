import React from 'react';
import { connect } from 'react-redux';
import { signUp } from 'actions/Auth-actions';
import PropTypes from 'prop-types';
import SignUpForm from 'components/Forms/auth-forms/Sign-up-form';
import './style.scss';

class SignUp extends React.Component {
  componentWillReceiveProps = ({ auth: { signUpData } }) => {
    if (signUpData) {
      this.props.history.push('/login');
    }
  }

  toSignIn = () => {
    this.props.history.push('/login');
  }

  checkLoginAsync = (e) => {
    console.log(e.target.value);
  }

  render = () => (
    <div id="auth">
      <h1>Task manager | Sign Up</h1>
      <div className="content">
        <SignUpForm
          onSubmit={(e) => { this.props.signUp(e); }}
          goToSignIn={this.toSignIn}
          validateLogin={this.checkLoginAsync}
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
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { signUp })(SignUp);
