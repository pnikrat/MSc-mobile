import { SET_GROUPS, ADD_GROUP, SET_CURRENT_GROUP,
  UPDATE_GROUP, DELETE_GROUP } from '../../state/constants';
import { apiSetSuccess } from '../../services/apiActions';

function setGroups(response) {
  return {
    type: SET_GROUPS,
    groups: response.data,
  };
}

function addGroup(response) {
  return {
    type: ADD_GROUP,
    group: response.data,
  };
}

function updateGroup(response) {
  return {
    type: UPDATE_GROUP,
    payload: response.data,
  };
}

function deleteGroup(id) {
  return {
    type: DELETE_GROUP,
    payload: id,
  };
}

function setCurrentGroup(response) {
  return {
    type: SET_CURRENT_GROUP,
    group: response.data,
  };
}

function redirectBack(navigation) {
  return response =>
    (dispatch) => {
      const { recipient_id: inviteeId } = response.data;
      const successMessage = inviteeId ? 'Użytkownik został dodany do grupy' : 'Wysłano zaproszenie na adres email użytkownika';
      dispatch(apiSetSuccess([successMessage]));
      navigation.goBack();
    };
}

export {
  setGroups, addGroup,
  updateGroup, deleteGroup, redirectBack,
  setCurrentGroup,
};
