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
};

export default initialState;
