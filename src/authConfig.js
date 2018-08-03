import { generateAuthActions } from 'redux-token-auth';
import { REACT_NATIVE_API_AUTH_URL } from 'react-native-dotenv';

const authUrl = REACT_NATIVE_API_AUTH_URL;

const config = {
  authUrl,
  userAttributes: {
    firstName: 'first_name',
    lastName: 'last_name',
    id: 'id',
  },
  userRegistrationAttributes: {
    firstName: 'first_name',
    lastName: 'last_name',
    invite_token: 'invite_token',
  },
  storage: {
    flushGetRequests: false,
  }
};

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials
} = generateAuthActions(config);

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials
};
