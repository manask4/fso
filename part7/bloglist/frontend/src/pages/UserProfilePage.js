import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Title from "../shared/Title";

function UserProfile() {
  const params = useParams();
  const id = params.id;
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return null;
  }

  return (
    <div>
      <Title>User</Title>
      <Title h2>{user.name}</Title>
      <div className="content">
        <h3 style={{ color: "#757575" }}>Blogs:</h3>
        {user.blogs.length > 0 && (
          <ol>
            {user.blogs.map((blog) => {
              return (
                <li style={{ marginBottom: "10px" }} key={blog.id}>
                  {blog.title}
                </li>
              );
            })}
          </ol>
        )}
        {user.blogs.length === 0 && <p>No blogs found</p>}
      </div>
    </div>
  );
}

export default UserProfile;
