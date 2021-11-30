import React from "react";
import { useDispatch } from "react-redux";
import { addBlogComment } from "../reducers/blogsReducer";
import { useParams } from "react-router";
import FormGroup from "../shared/FormGroup";
import FormInput from "../shared/FormInput";
import Button from "../shared/Button";

function CommentForm() {
  const dispatch = useDispatch();
  const blogID = useParams().id;
  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    e.target.comment.value = "";
    dispatch(addBlogComment(blogID, comment));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormInput type="text" name="comment" required />
        </FormGroup>
        <Button small default>
          Add Comment
        </Button>
      </form>
    </div>
  );
}

export default CommentForm;
