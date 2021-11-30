import React from "react";
import Blog from "../components/Blog";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Comments from "../components/Comments";
import Title from "../shared/Title";

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
        <Title>Blog</Title>
      </div>
      <div className="content">
        <Blog key={blog.id} blog={blog} />
        <Comments blog={blog} />
      </div>
    </div>
  );
}

export default BlogPage;
