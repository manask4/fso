import React, { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";

function CreateBlog({
  updateBlogs,
  handleSetDisplayCreateForm,
  flashNotification,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const newBlog = { title, author, url };
    const response = await blogService.create(newBlog);
    if (response.status === 201) {
      updateBlogs(response.data);
      flashNotification({ text: "New blog added!", type: "success" });
    }
    handleSetDisplayCreateForm();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleSetDisplayCreateForm();
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
      <form onSubmit={(e) => handleCreateBlog(e)}>
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

CreateBlog.propTypes = {
  updateBlogs: PropTypes.func.isRequired,
  handleSetDisplayCreateForm: PropTypes.func.isRequired,
  flashNotification: PropTypes.func.isRequired,
};

export default CreateBlog;
