import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function UserProfile() {
  const params = useParams();
  const id = params.id;
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === id);
  console.log(user);
  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="header">
        <div className="banner">
          <h1 className="title">User</h1>
          <h2>{user.name}</h2>
        </div>
      </div>
      <div className="content">
        <h3>Blogs:</h3>
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
