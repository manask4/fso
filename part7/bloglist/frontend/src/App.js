import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./forms/LoginForm";
import { initBlogs } from "./reducers/blogsReducer";
import { setUser } from "./reducers/authReducer";
import blogService from "./services/blogs";
import Header from "./components/Header";
import Home from "./pages/HomePage";
import Users from "./pages/UsersPage";
import UserProfile from "./pages/UserProfilePage";
import BlogPage from "./pages/BlogPage";
import Card from "./shared/Card";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
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
      <Router>
        <div className="main">
          <Card>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserProfile />} />
              <Route path="/blogs/:id" element={<BlogPage />} />
            </Routes>
          </Card>
        </div>
      </Router>
    );
  }

  return (
    <div className="app">
      <LoginForm />
    </div>
  );
};

export default App;
