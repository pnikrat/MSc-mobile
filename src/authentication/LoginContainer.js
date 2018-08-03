// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Header, Text, View } from 'native-base';
import { signInUser } from '../authConfig';

type Props = {
  currentUser: Object,
  navigation: any,
  sendLoginRequest: (Object) => Promise<void>,
}

class LoginContainer extends Component<Props> {
  render() {
    return (
      <Container>
        <Header />
        <Content padder>
          <Text>{this.props.currentUser.attributes.firstName}</Text>
          <Text>{this.props.currentUser.isSignedIn}</Text>
        </Content>
      </Container>
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
