import { SET_LISTS } from '../../state/constants';

function setLists(response) {
  return {
    type: SET_LISTS,
    lists: response.data,
  };
}

export {
  setLists,
};
