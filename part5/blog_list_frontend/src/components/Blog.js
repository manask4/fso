import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Blog({ blog, canDelete, handleLikes, handleDelete }) {
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
              onClick={() => handleLikes(blog.id, likes)}
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
                onClick={() => handleDelete(blog.id)}
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
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
