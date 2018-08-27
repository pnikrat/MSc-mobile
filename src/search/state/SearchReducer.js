import {
  SET_SEARCH_RESULTS, SET_SEARCH_FIELD_VALUE, SET_CURRENT_SEARCH_LIST,
} from '../../state/constants';

function searchReducer(state = {}, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return Object.assign({}, state, {
        results: action.payload === null ? [] : action.payload,
        value: state.value,
      });
    case SET_SEARCH_FIELD_VALUE:
      return Object.assign({}, state, {
        results: state.results,
        value: action.value,
      });
    case SET_CURRENT_SEARCH_LIST:
      return Object.assign({}, state, {
        currentList: action.payload,
        results: [],
      });
    default:
      return state;
  }
}

export default searchReducer;
