import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
// import usersService from "../services/users";

function Users() {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(setUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  return (
    <div>
      <div className="header">
        <div className="banner">
          <h1 className="title">Users</h1>
        </div>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
