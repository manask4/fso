const initialState = {
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN_ERROR":
      return { error: action.data };
    default:
      return state;
  }
};

export const setError = (data) => {
  return {
    type: "SET_LOGIN_ERROR",
    data,
  };
};

export default reducer;
