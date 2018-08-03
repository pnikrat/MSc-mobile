import { combineReducers } from 'redux';
import { reduxTokenAuthReducer as reduxTokenAuth } from 'redux-token-auth';
import { reducer as form } from 'redux-form';

import homeReducer from '../container/HomeContainer/reducer';

const appReducer = combineReducers({
  form,
  reduxTokenAuth,
  homeReducer,
});

export default appReducer;
