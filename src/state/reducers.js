import { combineReducers } from 'redux';
import { reduxTokenAuthReducer as reduxTokenAuth } from 'redux-token-auth';
import { reducer as form } from 'redux-form';
import listsReducer from '../lists/state/ListsReducer';
import apiLoadingReducer from '../services/apiLoadingReducer';
import apiMessagesReducer from '../services/apiMessagesReducer';

const appReducer = combineReducers({
  form,
  reduxTokenAuth,
  listsReducer,
  apiLoadingReducer,
  apiMessagesReducer,
});

export default appReducer;
