const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET":
      return action.data;
    default:
      return state;
  }
};

export const setFilter = (text) => {
  return {
    type: "SET",
    data: text,
  };
};

export default reducer;
