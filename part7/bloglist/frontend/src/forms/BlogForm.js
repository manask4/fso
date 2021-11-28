import React from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogsReducer";
import { toggleFormDisplay } from "../reducers/blogFormReducer";

function BlogForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;
    const newBlog = { title, author, url };
    dispatch(addBlog(newBlog));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(toggleFormDisplay());
  };

  return (
    <div className="create-new-blog-form">
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" size="40" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Author</label>
          <input id="author" type="text" name="author" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">URL</label>
          <input id="url" type="text" name="url" required />
        </div>
        <div className="form-actions">
          <button onClick={handleCancel} className="btn btn-secondary">
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

export default BlogForm;
