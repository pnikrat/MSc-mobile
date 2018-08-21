const initialState = {
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        firstName: null,
        lastName: null,
        id: null,
      },
    },
  },
  listsReducer: {
    lists: [],
  },
  apiMessagesReducer: {
    apiError: null,
    apiSuccess: null,
  },
  groupsReducer: {
    groups: [],
    currentGroup: {},
  },
};

export default initialState;
