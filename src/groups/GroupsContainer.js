// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { setGroups, updateGroup, deleteGroup,
  setCurrentGroup, addGroup, } from './state/GroupsActions';
import GroupsScreen from './screens/GroupsScreen';

type Props = {
  navigation: any,
  groups: Array<Object>,
  currentUser: Object,
  handleGroupsFetch: () => void,
  handleGroupAdd: (Object) => void,
  handleGroupShow: (number) => void,
  handleGroupUpdate: (number, Object) => void,
  handleGroupDelete: (number) => void,
}

class GroupsContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleGroupsFetch();
  }

  handleGroupAdd = (data: Object) => {
    this.props.handleGroupAdd(data);
    this.props.navigation.navigate('GroupsIndex');
  }

  handleGroupUpdate = (data: Object) => {
    const { id } = data;
    this.props.handleGroupUpdate(id, data);
    this.props.navigation.navigate('GroupsIndex');
  }

  handleGroupShow = (id: number) => {
    this.props.handleGroupShow(id);
  }

  handleGroupDelete = (id: number) => {
    this.props.handleGroupDelete(id);
  }

  actionSheetOptions = {
    options: ['Edytuj', 'Usuń', 'Anuluj'],
    destructiveButtonIndex: 1,
    cancelButtonIndex: 2,
    title: 'Wybierz akcję',
  }

  render() {
    const {
      navigation, groups, currentUser,
    } = this.props;
    return (
      <GroupsScreen
        navigation={navigation}
        groups={groups}
        currentUser={currentUser}
        actionSheetOptions={this.actionSheetOptions}
        onNewGroupSubmit={this.handleGroupAdd}
        onGroupDelete={this.handleGroupDelete}
        onGroupEdit={this.handleGroupUpdate}
        handleSetCurrentGroup={this.handleGroupShow}
      />
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupsReducer.groups,
  currentUser: state.reduxTokenAuth.currentUser.attributes,
});

const mapDispatchToProps = dispatch => ({
  handleGroupsFetch: () => dispatch(apiCall('/groups', setGroups, GET)),
  handleGroupAdd: group => dispatch(apiCall('/groups', addGroup, POST, group)),
  handleGroupShow: id => dispatch(apiCall(`/groups/${id}`, setCurrentGroup, GET)),
  handleGroupUpdate: (id, data) => {
    dispatch(apiCall(`/groups/${id}`, updateGroup, PUT, data));
  },
  handleGroupDelete: id => dispatch(apiCall(`/groups/${id}`, () => deleteGroup(id), DELETE)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
