// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../authConfig';
import AccountScreen from './screens/AccountScreen';

type Props = {
  navigation: any,
  sendLogoutRequest: () => Promise<void>,
}

class AccountContainer extends Component<Props> {
  handleSignOut = () => {
    this.props.sendLogoutRequest();
    this.props.navigation.navigate('Auth');
  }

  render() {
    const { navigation } = this.props;
    return (
      <AccountScreen logoutCallback={this.handleSignOut} navigation={navigation} />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendLogoutRequest: () => dispatch(signOutUser())
});

export default connect(null, mapDispatchToProps)(AccountContainer);
