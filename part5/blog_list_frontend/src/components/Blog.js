import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";

function Blog({ blog, canDelete, refreshBlogList }) {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLikes(blog.likes);
  }, [blog]);

  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  const toggleButtonColor = {
    backgroundColor: detailsVisible ? "#78909C" : "#26C6DA",
    color: "#fff",
  };

  const updateLikes = async (id) => {
    const payload = { likes: likes + 1 };
    const response = await blogService.update(id, payload);
    if (response.status === 200) {
      setLikes(response.data.likes);
      refreshBlogList();
    }
  };

  const deleteBlog = async (id) => {
    const message = "Are you sure you want to remove this blog?";
    const shouldDeleteBlog = window.confirm(message);
    if (shouldDeleteBlog) {
      const response = await blogService.remove(id);
      if (response.status === 204) {
        refreshBlogList();
      }
    }
  };

  return (
    <div className="blog">
      <div className="blog-summary">
        <h3 className="blog-title">
          {blog.title} - {blog.author}
        </h3>
        <button
          style={toggleButtonColor}
          onClick={toggleDetailsVisibility}
          className="btn btn-small"
        >
          {detailsVisible ? "Hide" : "View"}
        </button>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <span>
            Likes: {likes}{" "}
            <button
              onClick={() => updateLikes(blog.id)}
              className="btn btn-small"
            >
              Like
            </button>{" "}
          </span>
          <span>
            URL:{" "}
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </span>
          {canDelete && (
            <div>
              <button
                onClick={() => deleteBlog(blog.id)}
                className="btn btn-small blog-remove-btn"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  canDelete: PropTypes.bool.isRequired,
  refreshBlogList: PropTypes.func.isRequired,
};

export default Blog;
