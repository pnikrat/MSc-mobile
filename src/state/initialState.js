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
  groupsReducer: {
    groups: [],
    currentGroup: {},
  },
};

export default initialState;
