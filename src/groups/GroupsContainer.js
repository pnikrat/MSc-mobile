// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiCall } from '../services/apiActions';
import { GET, POST, PUT, DELETE } from '../state/constants';
import { setGroups, addGroupAndRedirectBack, showGroup,
  editGroup, updateGroupAndRedirectBack, deleteGroup,
  redirectBack, } from './state/GroupsActions';
import GroupsScreen from './screens/GroupsScreen';

type Props = {
  navigation: any,
  groups: Array<Object>,
  currentGroup: Object,
  currentUser: Object,
  handleGroupsFetch: () => void,
  handleGroupAdd: (Object) => void,
  handleGroupShow: (number, Function) => void,
  handleGroupUpdate: (number, Object) => void,
  handleGroupDelete: (number) => void,
  handleInviteCreate: (Object) => void,
}

class GroupsContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleGroupsFetch();
  }

  handleGroupAdd = (data: Object) => {
    this.props.handleGroupAdd(data);
  }

  handleGroupUpdate = (data: Object) => {
    const { id } = data;
    this.props.handleGroupUpdate(id, data);
  }

  handleGroupShow = (id: number) => {
    this.props.handleGroupShow(id, showGroup);
  }

  handleGroupEditRedirect = (e: Object, id: number) => {
    e.stopPropagation();
    this.props.handleGroupShow(id, editGroup);
  }

  handleGroupDelete = (id: number) => {
    this.props.handleGroupDelete(id);
  }

  handleInviteCreate = (data: Object) => {
    this.props.handleInviteCreate(data);
  }

  render() {
    const {
      navigation, groups, currentGroup, currentUser,
    } = this.props;
    return (
      <GroupsScreen
        navigation={navigation}
        groups={groups}
      />
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupsReducer.groups,
  currentGroup: state.groupsReducer.currentGroup,
  currentUser: state.reduxTokenAuth.currentUser.attributes,
});

const mapDispatchToProps = dispatch => ({
  handleGroupsFetch: () => dispatch(apiCall('/groups', setGroups, GET)),
  handleGroupAdd: group => dispatch(apiCall('/groups', addGroupAndRedirectBack, POST, group)),
  handleGroupShow: (id, callback) => dispatch(apiCall(`/groups/${id}`, callback, GET)),
  handleGroupUpdate: (id, data) => {
    dispatch(apiCall(`/groups/${id}`, updateGroupAndRedirectBack, PUT, data));
  },
  handleGroupDelete: id => dispatch(apiCall(`/groups/${id}`, () => deleteGroup(id), DELETE)),
  handleInviteCreate: data => dispatch(apiCall('/invites', redirectBack, POST, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
