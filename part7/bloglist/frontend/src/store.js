import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import loginFormReducer from "./reducers/loginFormReducer";
import blogFormReducer from "./reducers/blogFormReducer";
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import authReducer from "./reducers/authReducer";
import usersReducer from "./reducers/usersReducer";

const reducer = combineReducers({
  loginForm: loginFormReducer,
  blogForm: blogFormReducer,
  notification: notificationReducer,
  blogs: blogsReducer,
  auth: authReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
