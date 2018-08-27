import {
  SET_SEARCH_RESULTS, SET_SEARCH_FIELD_VALUE, SET_CURRENT_SEARCH_LIST,
} from '../../state/constants';

function setSearchResults(response) {
  return {
    type: SET_SEARCH_RESULTS,
    payload: response.data,
  };
}

function setSearchFieldValue(value) {
  return {
    type: SET_SEARCH_FIELD_VALUE,
    value,
  };
}

function setCurrentSearchList(list) {
  return {
    type: SET_CURRENT_SEARCH_LIST,
    payload: list,
  };
}

export {
  setSearchResults,
  setSearchFieldValue,
  setCurrentSearchList,
};
