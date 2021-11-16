import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import authService from "./services/auth";
import LoginForm from "./forms/LoginForm";
import BlogForm from "./forms/BlogForm";
import BlogList from "./components/BlogList";
import AuthLinks from "./components/AuthLinks";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayCreateForm, setDisplayCreateForm] = useState(false);
  const [notification, setNotification] = useState({ type: null, text: null });

  useEffect(() => {
    refreshBlogList();

    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      const userInfo = JSON.parse(loggedInUser);
      setUser(userInfo);
      blogService.setToken(userInfo.token);
    }
  }, []);

  const updateBlogs = (newBlog) => {
    const newBlogs = blogs.concat(newBlog);
    setBlogs(newBlogs);
  };

  const refreshBlogList = () => {
    blogService.getAll().then((blogs) => {
      blogs.sort((first, second) => second.likes - first.likes);
      setBlogs(blogs);
    });
  };

  const flashNotification = ({ text, type }) => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification({ text: null, type: null });
    }, 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await authService.login({ username, password });
    if (response.status === 200) {
      setUser(response.data);
      window.localStorage.setItem("user", JSON.stringify(response.data));
      blogService.setToken(response.data.token);
    } else {
      setErrorMessage("Invalid credentials provided.");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    blogService.setToken(null);
  };

  const handleUsernameChange = (name) => {
    setUsername(name);
  };

  const handlePasswordChange = (pass) => {
    setPassword(pass);
  };

  const handleSetDisplayCreateForm = () => {
    setDisplayCreateForm(!displayCreateForm);
  };

  const handleBlogCreate = async (newBlog) => {
    const response = await blogService.create(newBlog);
    if (response.status === 201) {
      updateBlogs(response.data);
      flashNotification({ text: "New blog added!", type: "success" });
    }
    handleSetDisplayCreateForm();
  };

  if (user !== null) {
    return (
      <div className="main">
        <div className="container card">
          <div className="header">
            <div className="banner">
              <h1 className="title">Blogs</h1>
              {!displayCreateForm && (
                <button
                  onClick={handleSetDisplayCreateForm}
                  className="btn blog-create-btn"
                >
                  Create new
                </button>
              )}
            </div>
            <AuthLinks user={user} handleLogout={handleLogout} />
          </div>
          <div className="content">
            {displayCreateForm && (
              <BlogForm
                onBlogCreate={handleBlogCreate}
                onToggle={handleSetDisplayCreateForm}
              />
            )}
            <Notification message={notification} />
            {!displayCreateForm && (
              <BlogList
                refreshBlogList={refreshBlogList}
                user={user}
                blogs={blogs}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <LoginForm
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleLogin={handleLogin}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default App;
