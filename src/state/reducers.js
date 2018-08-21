import { combineReducers } from 'redux';
import { reduxTokenAuthReducer as reduxTokenAuth } from 'redux-token-auth';
import { reducer as form } from 'redux-form';
import listsReducer from '../lists/state/ListsReducer';
import apiLoadingReducer from '../services/apiLoadingReducer';
import apiMessagesReducer from '../services/apiMessagesReducer';
import groupsReducer from '../groups/state/GroupsReducer';

const appReducer = combineReducers({
  form,
  reduxTokenAuth,
  listsReducer,
  apiLoadingReducer,
  apiMessagesReducer,
  groupsReducer,
});

export default appReducer;
