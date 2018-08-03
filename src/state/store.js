// @flow
import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import initialState from './initialState';

const middleWare = [thunk];
const composeEnhancers = composeWithDevTools({ realtime: true, port: 19001 });
const enhancer = composeEnhancers(applyMiddleware(...middleWare));
const store = createStore(reducers, initialState, enhancer);

export default store;