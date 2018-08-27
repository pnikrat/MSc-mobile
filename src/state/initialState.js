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
  itemsReducer: {
    currentList: null,
    items: [],
  },
  apiMessagesReducer: {
    apiError: null,
    apiSuccess: null,
  },
  searchReducer: {
    currentList: null,
    results: [],
    value: '',
  },
  groupsReducer: {
    groups: [],
    currentGroup: {},
  },
};

export default initialState;
