// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { setLists, addList, editList, removeList } from './state/ListsActions';
import ListsScreen from './screens/ListsScreen';

type Props = {
  navigation: any,
  currentUser: Object,
  lists: Array<Object>,
  handleListsFetch: () => void,
  handleListAdd: (Object) => void,
  handleListDelete: (number) => void,
  handleListEdit: (number, Object) => void,
}

class ListsContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleListsFetch();
  }

  handleListAdd = (data: Object) => {
    this.props.handleListAdd(data);
    this.props.navigation.navigate('ListsIndex');
  }

  actionSheetOptions = {
    options: ['Edytuj', 'Usuń', 'Anuluj'],
    destructiveButtonIndex: 1,
    cancelButtonIndex: 2,
    title: 'Wybierz akcję',
  }

  render() {
    const {
      lists, currentUser, navigation,
    } = this.props;
    return (
      <ListsScreen
        currentUser={currentUser}
        lists={lists}
        navigation={navigation}
        onNewListSubmit={this.handleListAdd}
        actionSheetOptions={this.actionSheetOptions}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser.attributes,
  lists: state.listsReducer.lists,
});

const mapDispatchToProps = dispatch => ({
  handleListsFetch: () => dispatch(apiCall('/lists', setLists, GET)),
  handleListAdd: list => dispatch(apiCall('/lists', addList, POST, list)),
  handleListDelete: id => dispatch(apiCall(`/lists/${id}`, () => removeList(id), DELETE)),
  handleListEdit: (id, data) => dispatch(apiCall(`/lists/${id}`, editList, PUT, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
