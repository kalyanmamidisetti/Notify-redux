const initialState = {
  notifications: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_SNACK_BAR":
      return {
        notifications: [...action.payload],
      };
    case "CLOSE_SNACK_BAR":
      return {
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.payload.key
        ),
      };
    default:
      return initialState;
  }
};

export default reducer;
