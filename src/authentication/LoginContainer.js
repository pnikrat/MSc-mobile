// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { signInUser } from '../authConfig';

type Props = {
  currentUser: Object,
  navigation: any,
  sendLoginRequest: (Object) => Promise<void>,
}

class LoginContainer extends Component<Props> {
  render() {
    return (
      <Container />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser
});

const mapDispatchToProps = dispatch => ({
  sendLoginRequest: data => dispatch(signInUser(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
