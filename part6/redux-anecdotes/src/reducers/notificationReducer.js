const reducer = (state = "", action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.message;
    case "REMOVE":
      return "";
    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  return async (dispatch) => {
    clearTimeout(window.timeoutID);
    window.timeoutID = setTimeout(() => {
      dispatch({ type: "REMOVE", message: "" });
    }, time * 1000);
    dispatch({
      type: "NOTIFY",
      message,
    });
  };
};

export default reducer;
