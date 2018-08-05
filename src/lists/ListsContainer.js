// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { setLists } from './ListsActions';
import ListsScreen from './screens/ListsScreen';

type Props = {
  navigation: any,
  currentUser: Object,
  lists: Array<Object>,
  handleListsFetch: () => void,
}

class ListsContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleListsFetch();
  }

  render() {
    const {
      lists, currentUser, navigation,
    } = this.props;
    return (
      <ListsScreen currentUser={currentUser} lists={lists} navigation={navigation} />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser.attributes,
  lists: state.listsReducer.lists,
});

const mapDispatchToProps = dispatch => ({
  handleListsFetch: () => dispatch(apiCall('/lists', setLists, GET)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
