export const showSnackBar = (payload) => (dispatch) => {
  dispatch({ type: "SHOW_SNACK_BAR", payload: payload });
};

export const closeSnackBar = (payload) => (dispatch) => {
  dispatch({ type: "CLOSE_SNACK_BAR", payload: payload });
};
