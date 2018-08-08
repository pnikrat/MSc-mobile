import axios from 'axios';
import { REACT_NATIVE_APP_BASE_URL } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';
import { GET, POST, PUT, DELETE } from '../state/constants';

const BASE_URL = REACT_NATIVE_APP_BASE_URL;

const setHeaders = (instance) => {
  let token, uid, client;
  return AsyncStorage.multiGet(['access-token', 'uid', 'client'], (err, stores) => {
    if (err) {
      console.log(err);
    }
    stores.map(result => {
      let key = result[0];
      let value = result[1];
      if (key === 'access-token') {
        token = value;
      } else if (key === 'uid') {
        uid = value;
      } else {
        client = value;
      }
    });
    instance.defaults.headers = {
      Accept: 'application/json;version=1',
      'Content-Type': 'application/json',
      'Access-Token': `${token}`,
      'Token-Type': 'Bearer',
      uid: `${uid}`,
      client: `${client}`,
    };
  });
};

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

function get(url, params = {}) {
  return setHeaders(instance).then(() => instance.get(url, params));
}

function post(url, data) {
  const body = JSON.stringify(data);
  return setHeaders(instance).then(() => instance.post(url, body));
}

function put(url, data) {
  const body = JSON.stringify(data);
  return setHeaders(instance).then(() => instance.put(url, body));
}

// delete is JS reserved word
function apiDelete(url) {
  return setHeaders(instance).then(() => instance.delete(url));
}

function call(payload) {
  const { url, method, data } = payload;
  switch (method) {
    case GET:
      return get(url);
    case POST:
      return post(url, data);
    case PUT:
      return put(url, data);
    case DELETE:
      return apiDelete(url);
    default:
      return Promise.reject();
  }
}

export default call;
