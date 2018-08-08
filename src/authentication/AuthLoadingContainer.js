//@flow
import React, { Component } from 'react';
import { Spinner } from 'native-base';
import { View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles/loadingStyles';

type Props = {
  currentUser: Object,
  navigation: any,
}

class AuthLoadingContainer extends Component<Props> {
  componentDidMount = () => {
    this._isUserLoggedInAsync();
  }

  _isUserLoggedInAsync = async () => {
    const isUserSignedIn = await this.props.currentUser.isSignedIn;
    this.props.navigation.navigate(isUserSignedIn ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.verticalCenter}>
        <Spinner color="blue" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser
});

export default connect(mapStateToProps, null)(AuthLoadingContainer);
