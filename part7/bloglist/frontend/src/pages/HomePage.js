import React from "react";
import BlogForm from "../forms/BlogForm";
import BlogList from "../components/BlogList";
import Notification from "../components/Notification";
import { useSelector, useDispatch } from "react-redux";
import { toggleFormDisplay } from "../reducers/blogFormReducer";
import Button from "../shared/Button";
import Title from "../shared/Title";

const Home = () => {
  const dispatch = useDispatch();
  const showForm = useSelector((state) => state.blogForm.display);

  return (
    <div>
      <div className="header">
        <Title style={{ marginRight: "1em" }}>Blogs</Title>
        {!showForm && (
          <Button primary onClick={() => dispatch(toggleFormDisplay())}>
            Create new
          </Button>
        )}
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
