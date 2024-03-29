import React, { useState } from "react";
import PropTypes from "prop-types";

function BlogForm({ onBlogCreate, onToggle }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = { title, author, url };
    onBlogCreate(newBlog);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onToggle();
  };

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  const handleAuthorChange = (newAuthor) => {
    setAuthor(newAuthor);
  };

  const handleURLChange = (newURL) => {
    setUrl(newURL);
  };

  return (
    <div className="create-new-blog-form">
      <h2>Create new blog</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => handleTitleChange(e.target.value)}
            value={title}
            id="title"
            type="text"
            name="title"
            size="40"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Author</label>
          <input
            onChange={(e) => handleAuthorChange(e.target.value)}
            value={author}
            id="author"
            type="text"
            name="author"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">URL</label>
          <input
            onChange={(e) => handleURLChange(e.target.value)}
            value={url}
            id="url"
            type="text"
            name="url"
            required
          />
        </div>
        <div className="form-actions">
          <button
            onClick={(e) => handleCancel(e)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button className="btn btn-success create-new-blog-btn" type="submit">
            Create New
          </button>
        </div>
      </form>
    </div>
  );
}

BlogForm.propTypes = {
  onBlogCreate: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default BlogForm;
