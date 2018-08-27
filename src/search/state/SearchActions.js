import {
  SET_SEARCH_RESULTS, SET_SEARCH_FIELD_VALUE,
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

export {
  setSearchResults,
  setSearchFieldValue,
};
