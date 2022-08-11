const initialState = {
  notifications: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        notifications: [...action.payload],
      };
    case "CLOSE_NOTIFICATION":
      return {
        notifications:
          state.notifications &&
          state.notifications.filter(
            (notification) => notification.id !== action.payload.id
          ),
      };
    case "REMOVE_ALL_NOTIFICATIONS":
      return {
        notifications: [],
      };
    default:
      return initialState;
  }
};

export default reducer;
