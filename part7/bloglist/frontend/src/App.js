import React, { useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./forms/LoginForm";
import BlogForm from "./forms/BlogForm";
import BlogList from "./components/BlogList";
import AuthLinks from "./components/AuthLinks";
import Notification from "./components/Notification";
import { useSelector, useDispatch } from "react-redux";
import { toggleFormDisplay } from "./reducers/blogFormReducer";
import { initBlogs } from "./reducers/blogsReducer";
import { setUser } from "./reducers/authReducer";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const showForm = useSelector((state) => state.blogForm.display);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(initBlogs());

    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      const userInfo = JSON.parse(loggedInUser);
      dispatch(setUser(userInfo));
      blogService.setToken(userInfo.token);
    }
  }, []);

  if (user !== null) {
    return (
      <div className="main">
        <div className="container card">
          <div className="header">
            <div className="banner">
              <h1 className="title">Blogs</h1>
              {!showForm && (
                <button
                  onClick={() => dispatch(toggleFormDisplay())}
                  className="btn blog-create-btn"
                >
                  Create new
                </button>
              )}
            </div>
            <AuthLinks />
          </div>
          <div className="content">
            {showForm && <BlogForm />}
            <Notification />
            {!showForm && <BlogList />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <LoginForm />
    </div>
  );
};

export default App;
