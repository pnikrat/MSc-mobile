// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../authConfig';
import withAuth from './withAuth';
import LoginForm from './LoginForm';

type Props = {
  currentUser: Object,
  navigation: any,
  sendLoginRequest: (Object) => Promise<void>,
}

const LoginFormWithAuthScreen = withAuth(LoginForm);

class LoginContainer extends Component<Props> {
  render() {
    const { navigation, sendLoginRequest } = this.props;
    return (
      <LoginFormWithAuthScreen
        navigation={navigation}
        headerText="Zaloguj się"
        errorCode={401}
        sendAuthRequest={sendLoginRequest}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  sendLoginRequest: data => dispatch(signInUser(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
