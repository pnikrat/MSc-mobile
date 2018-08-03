// @flow
// import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducers from './reducers';
import initialState from './initialState';

export default function configureStore(onCompletion: () => void): any {
  const middleWare = [thunk];
  const enhancer = compose(
    applyMiddleware(...middleWare),
    devTools({
      name: 'nativestarterkit',
      realtime: true
    })
  );

  const store = createStore(reducers, initialState, enhancer);
  persistStore(store, onCompletion);

  return store;
}
