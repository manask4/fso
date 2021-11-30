import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogsReducer";
import Title from "../shared/Title";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";

function Blog({ blog }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const canDelete = blog.user.id === user.id;

  const handleDelete = async (id) => {
    const message = "Are you sure you want to remove this blog?";
    const shouldDeleteBlog = window.confirm(message);
    if (shouldDeleteBlog) {
      dispatch(deleteBlog(id));
      navigate("/");
    }
  };

  const blogDetails = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "10px",
  };

  return (
    <div>
      <Title h2>
        {blog.title} - {blog.author}
      </Title>
      <div style={blogDetails}>
        <span>
          Link:{" "}
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </span>
        <span>
          Likes: {blog.likes}{" "}
          <Button small default onClick={() => dispatch(likeBlog(blog))}>
            Like
          </Button>{" "}
        </span>

        <span>Added by: {blog.user.name}</span>
        {canDelete && (
          <div>
            <Button small onClick={() => handleDelete(blog.id)}>
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
