// @flow
// import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import initialState from './initialState';
import apiMiddleware from '../services/apiMiddleware';

const middleWare = [thunk, apiMiddleware];
// const composeEnhancers = composeWithDevTools({ realtime: true, port: 19001 });
const middleWareComposed = applyMiddleware(...middleWare);
// const enhancer = composeEnhancers(middleWareComposed);
const store = createStore(reducers, initialState, middleWareComposed);

export default store;
