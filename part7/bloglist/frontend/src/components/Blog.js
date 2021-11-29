import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogsReducer";

function Blog({ blog }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const canDelete = blog.user.id === user.id;

  const handleDelete = async (id) => {
    const message = "Are you sure you want to remove this blog?";
    const shouldDeleteBlog = window.confirm(message);
    if (shouldDeleteBlog) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div className="blog">
      <div className="blog-summary">
        <h2 className="blog-title">
          {blog.title} - {blog.author}
        </h2>
      </div>
      <div className="blog-details">
        <span>
          Link:{" "}
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </span>
        <span>
          Likes: {blog.likes}{" "}
          <button
            onClick={() => dispatch(likeBlog(blog))}
            className="btn btn-small"
          >
            Like
          </button>{" "}
        </span>

        <span>Added by: {blog.user.name}</span>
        {canDelete && (
          <div>
            <button
              onClick={() => handleDelete(blog.id)}
              className="btn btn-small blog-remove-btn"
            >
              Remove
            </button>
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
