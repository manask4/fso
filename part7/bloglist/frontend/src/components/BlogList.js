import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BlogList() {
  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      {blogs
        .sort((first, second) => second.likes - first.likes)
        .map((blog) => (
          <div style={{ marginBottom: "10px" }} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} - {blog.author}
            </Link>
          </div>
        ))}
    </>
  );
}

export default BlogList;
