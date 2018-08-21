import { SET_CURRENT_LIST, SET_ITEMS,
  ADD_ITEM, REMOVE_ITEM, GET, EDIT_ITEM
} from '../../state/constants';
import { apiCall } from '../../services/apiActions';


function setCurrentList(response) {
  return {
    type: SET_CURRENT_LIST,
    list: response.data,
  };
}

function setItems(response) {
  return {
    type: SET_ITEMS,
    items: response.data,
  };
}

function setCurrentListAndFetchItems(response) {
  return (dispatch) => {
    const { id } = response.data;
    dispatch(setCurrentList(response));
    dispatch(apiCall(`/lists/${id}/items`, setItems, GET));
  };
}

function addItem(response) {
  return {
    type: ADD_ITEM,
    item: response.data,
  };
}

function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    payload: id,
  };
}

function editItem(response) {
  return {
    type: EDIT_ITEM,
    payload: response.data,
  };
}

function massUpdateItems(response) {
  return (dispatch) => {
    response.data.forEach((entity) => {
      dispatch(editItem({ data: entity }));
    });
  };
}

function massMoveItems(response) {
  return (dispatch) => {
    response.data.forEach((entity) => {
      dispatch(removeItem(entity.id));
    });
  };
}

export {
  setCurrentList,
  setItems,
  setCurrentListAndFetchItems,
  addItem,
  removeItem,
  editItem,
  massUpdateItems,
  massMoveItems,
};
