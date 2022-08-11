//FOR SHOWING THE NOTIFICATIONS
export const showNotification = (payload) => (dispatch) => {
  dispatch({ type: "SHOW_NOTIFICATION", payload: payload });
};

//FOR CLOSING THE SINGLE NOTFICATIONS
export const closeNotification = (payload) => (dispatch) => {
  dispatch({ type: "CLOSE_NOTIFICATION", payload: payload });
};

//FOR CLOSING ALL THE NOTIFICATIONS
export const removeAllNotifications = () => (dispatch) => {
  dispatch({ type: "REMOVE_ALL_NOTIFICATIONS", payload: {} });
};
