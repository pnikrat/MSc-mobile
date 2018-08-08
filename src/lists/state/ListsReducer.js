import { SET_LISTS } from '../../state/constants';

function listsReducer(state = {}, action) {
  switch (action.type) {
    case SET_LISTS:
      return Object.assign({}, state, {
        lists: action.lists
      });
    default:
      return state;
  }
}

export default listsReducer;
