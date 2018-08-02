// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LandingContainer from '../landing/LandingContainer';

type Props = {
  currentUser: Object,
  navigation: any,
}

class Home extends Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <LandingContainer navigation={navigation} />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser
});

export default connect(mapStateToProps, null)(Home);
