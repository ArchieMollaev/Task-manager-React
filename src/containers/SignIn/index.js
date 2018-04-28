import React from 'react';
import { connect } from 'react-redux';
import { signIn, getUserData, getFromStorage } from 'actions/User';
import PropTypes from 'prop-types';
import SignInForm from 'components/Forms/auth-forms/Sign-in-form';
import './style.scss';

class SignIn extends React.Component {
  componentWillMount() {
    this.checkState();
  }

  componentWillReceiveProps = ({ user }) => {
    if (user.token) {
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

  toSignUp = () => {
    this.props.history.push('/signup');
  }

  render = () => (
    <div id="auth">
      <div className="content">
        <SignInForm
          onSubmit={(e) => { this.props.signIn(e); }}
          goToSignUp={this.toSignUp}
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

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { signIn, getUserData })(SignIn);
