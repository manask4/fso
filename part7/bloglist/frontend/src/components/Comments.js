import React from "react";
import PropTypes from "prop-types";
import CommentForm from "../forms/CommentForm";

function Comments({ blog }) {
  return (
    <div>
      <h4 style={{ marginBottom: 0 }}>Comments: </h4>
      <CommentForm />
      {blog.comments.length > 0 && (
        <ul>
          {blog.comments.map((comment, i) => (
            <li style={{ marginBottom: "5px" }} key={i}>
              {comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Comments.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Comments;
