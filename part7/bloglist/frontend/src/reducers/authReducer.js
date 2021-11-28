import blogService from "../services/blogs";
import authService from "../services/auth";
import { setError } from "./loginFormReducer";

const initialState = { user: null };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET":
      return { user: action.data };
    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: "SET",
    data: user,
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await authService.login({ username, password });
    if (response.status === 200) {
      dispatch(setUser(response.data));
      window.localStorage.setItem("user", JSON.stringify(response.data));
      blogService.setToken(response.data.token);
    } else {
      dispatch(setError("Invalid credentials provided."));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
    window.localStorage.removeItem("user");
    blogService.setToken(null);
  };
};

export default reducer;
