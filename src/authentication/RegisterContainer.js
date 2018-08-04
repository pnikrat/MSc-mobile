// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../authConfig';
import withAuth from './withAuth';
import RegisterForm from './RegisterForm';

type Props = {
  currentUser: Object,
  navigation: any,
  sendRegisterRequest: (Object) => Promise<void>,
}

const RegisterFormWithAuthScreen = withAuth(RegisterForm);

class RegisterContainer extends Component<Props> {
  render() {
    const { navigation, sendRegisterRequest } = this.props;
    return (
      <RegisterFormWithAuthScreen
        navigation={navigation}
        headerText="Zarejestruj się"
        errorCode={422}
        sendAuthRequest={sendRegisterRequest}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  sendRegisterRequest: data => dispatch(registerUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
