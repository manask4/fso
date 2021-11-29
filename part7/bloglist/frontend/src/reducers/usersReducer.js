import usersService from "../services/users";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USERS":
      return action.data;
    case "REMOVE_USERS":
      return [];
    default:
      return state;
  }
};

export const setUsers = () => {
  return async (dispatch) => {
    const data = await usersService.getAll();
    dispatch({
      type: "SET_USERS",
      data,
    });
  };
};

export default reducer;
