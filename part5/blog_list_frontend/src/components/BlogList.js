import React from "react";
import PropTypes from "prop-types";
import Blog from "./Blog";

function BlogList({ user, blogs, refreshBlogList }) {
  return (
    <>
      {blogs.map((blog) => (
        <Blog
          refreshBlogList={refreshBlogList}
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
