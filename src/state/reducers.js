import { combineReducers } from 'redux';
import { reduxTokenAuthReducer as reduxTokenAuth } from 'redux-token-auth';
import { reducer as form } from 'redux-form';
import listsReducer from '../lists/state/ListsReducer';
import itemsReducer from '../items/state/ItemsReducer';
import apiLoadingReducer from '../services/apiLoadingReducer';
import apiMessagesReducer from '../services/apiMessagesReducer';
import searchReducer from '../search/state/SearchReducer';
import groupsReducer from '../groups/state/GroupsReducer';

const appReducer = combineReducers({
  form,
  reduxTokenAuth,
  listsReducer,
  itemsReducer,
  apiLoadingReducer,
  apiMessagesReducer,
  searchReducer,
  groupsReducer,
});

export default appReducer;
