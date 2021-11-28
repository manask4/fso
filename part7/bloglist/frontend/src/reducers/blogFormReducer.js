const initialState = {
  display: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_FORM":
      return { display: !state.display };
    default:
      return state;
  }
};

export const toggleFormDisplay = () => {
  return {
    type: "SHOW_FORM",
  };
};

export default reducer;
