import React from "react";
import { useDispatch } from "react-redux";
import { addBlogComment } from "../reducers/blogsReducer";
import { useParams } from "react-router";

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
        <div className="form-group">
          <input type="text" name="comment" required />
        </div>
        <button className="btn btn-small">Add Comment</button>
      </form>
    </div>
  );
}

export default CommentForm;
