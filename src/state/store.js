// @flow
// import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import reducers from './reducers';
import initialState from './initialState';
import apiMiddleware from '../services/apiMiddleware';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const middleWare = [thunk, apiMiddleware];
// const composeEnhancers = composeWithDevTools({ realtime: true, port: 19001 });
const middleWareComposed = applyMiddleware(...middleWare);
// const enhancer = composeEnhancers(middleWareComposed);
const store = createStore(persistedReducer, initialState, middleWareComposed);
const persistor = persistStore(store);

export {
  store, persistor,
};
