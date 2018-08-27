import {
  SET_SEARCH_RESULTS, SET_SEARCH_FIELD_VALUE,
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
    default:
      return state;
  }
}

export default searchReducer;
