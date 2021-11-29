import React from "react";
import Blog from "../components/Blog";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Comments from "../components/Comments";

function BlogPage() {
  const params = useParams();
  const id = params.id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);
  if (!blog) {
    return null;
  }

  return (
    <div>
      <div className="header">
        <div className="banner">
          <h1 className="title">Blog</h1>
        </div>
      </div>
      <div className="content">
        <Blog key={blog.id} blog={blog} />
        <Comments blog={blog} />
      </div>
    </div>
  );
}

export default BlogPage;
