import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import Title from "../shared/Title";
import { Table, TableData, TableHeader } from "../shared/Table";

function Users() {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(setUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  return (
    <div>
      <div className="header">
        <Title className="title">Users</Title>
      </div>
      <div className="content">
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Blogs created</TableHeader>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} style={{ backgroundColor: "#FAFAFA" }}>
                  <TableData>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableData>
                  <TableData alignRight>{user.blogs.length}</TableData>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Users;
