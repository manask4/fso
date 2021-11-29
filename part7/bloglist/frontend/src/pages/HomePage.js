import React from "react";
import BlogForm from "../forms/BlogForm";
import BlogList from "../components/BlogList";
import Notification from "../components/Notification";
import { useSelector, useDispatch } from "react-redux";
import { toggleFormDisplay } from "../reducers/blogFormReducer";

const Home = () => {
  const dispatch = useDispatch();
  const showForm = useSelector((state) => state.blogForm.display);

  return (
    <div>
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
      </div>
      <div className="content">
        {showForm && <BlogForm />}
        <Notification />
        {!showForm && <BlogList />}
      </div>
    </div>
  );
};

export default Home;
