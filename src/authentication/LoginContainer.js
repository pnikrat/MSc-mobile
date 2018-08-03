// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';

type Props = {
  navigation: any,
}

class LoginContainer extends Component<Props> {
  render() {
    return (
      <Container />
    );
  }
}

export default connect(null, null)(LoginContainer);
