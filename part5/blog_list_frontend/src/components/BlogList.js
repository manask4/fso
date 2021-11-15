import React from "react";
import PropTypes from "prop-types";
import Blog from "./Blog";
import blogService from "../services/blogs";

function BlogList({ user, blogs, refreshBlogList }) {
  const handleLikes = async (id, likes) => {
    const payload = { likes: likes + 1 };
    const response = await blogService.update(id, payload);
    if (response.status === 200) {
      refreshBlogList();
    }
  };

  const handleDelete = async (id) => {
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
    <>
      {blogs.map((blog) => (
        <Blog
          handleLikes={handleLikes}
          handleDelete={handleDelete}
          key={blog.id}
          blog={blog}
          canDelete={blog.user.id === user.id}
        />
      ))}
    </>
  );
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  refreshBlogList: PropTypes.func.isRequired,
};

export default BlogList;
