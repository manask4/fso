const initialState = { type: null, text: null, time: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.data;
    case "REMOVE":
      return initialState;
    default:
      return state;
  }
};

export const flashNotification = ({ type, text, time }) => {
  return async (dispatch) => {
    clearTimeout(window.notificationTimeoutID);
    window.notificationTimeoutID = setTimeout(() => {
      dispatch({ type: "REMOVE", data: null });
    }, time * 1000);
    dispatch({
      type: "NOTIFY",
      data: { type, text, time },
    });
  };
};

export default reducer;
