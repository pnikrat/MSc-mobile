// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import LandingContainer from '../landing/LandingContainer';
import ListsContainer from '../lists/ListsContainer';

type Props = {
  currentUser: Object,
  navigation: any,
}

class Home extends React.Component<Props> {
  render() {
    const { navigation, currentUser } = this.props;
    return (
      <React.Fragment>
      { currentUser.isSignedIn && <ListsContainer navigation={navigation} /> }
      { !currentUser.isSignedIn && <LandingContainer navigation={navigation} /> }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser
});

export default connect(mapStateToProps, null)(Home);
