// @flow
import ActionCable from 'react-native-actioncable';
import { REACT_NATIVE_APP_WS_BASE_URL } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';

const WEBSOCKET_HOST = REACT_NATIVE_APP_WS_BASE_URL;

function createConsumer(callback: (Object, () => void) => void, initCallback: () => void) {
  let token;
  let uid;
  let client;
  AsyncStorage.multiGet(['access-token', 'uid', 'client'], (err, stores) => {
    if (err) {
      console.log(err);
    }
    stores.map((result) => {
      const key = result[0];
      const value = result[1];
      if (key === 'access-token') {
        token = value;
      } else if (key === 'uid') {
        uid = value;
      } else {
        client = value;
      }
      return null;
    });
    callback(ActionCable.createConsumer(
      `${WEBSOCKET_HOST}?access-token=${token}&client=${client}&uid=${uid}`
    ), initCallback);
  });
}

export default createConsumer;
