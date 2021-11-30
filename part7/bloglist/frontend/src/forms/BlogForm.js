import React from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogsReducer";
import { toggleFormDisplay } from "../reducers/blogFormReducer";
import Button from "../shared/Button";
import Title from "../shared/Title";
import FormGroup from "../shared/FormGroup";
import FormInput from "../shared/FormInput";
import FormInputLabel from "../shared/FormInputLabel";

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

  const formContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={formContainer}>
      <Title h2>Create new blog</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormInputLabel htmlFor="title">Title</FormInputLabel>
          <FormInput id="title" type="text" name="title" size="40" required />
        </FormGroup>
        <FormGroup>
          <FormInputLabel htmlFor="password">Author</FormInputLabel>
          <FormInput id="author" type="text" name="author" required />
        </FormGroup>
        <FormGroup>
          <FormInputLabel htmlFor="password">URL</FormInputLabel>
          <FormInput id="url" type="text" name="url" required />
        </FormGroup>
        <div className="form-actions">
          <Button onClick={handleCancel} className="btn btn-secondary">
            Cancel
          </Button>
          <Button id="create-new-blog-btn" primary type="submit">
            Create New
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
