import React from "react";
import { Link } from "react-router-dom";
import AuthLinks from "./AuthLinks";

function NavbarItem() {
  return (
    <div
      style={{
        display: "flex",
        padding: "1em",
        justifyContent: "space-between",
        backgroundColor: "#D1C4E9",
      }}
    >
      <div style={{ display: "flex", gap: "1em" }}>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
      </div>
      <div>
        <AuthLinks />
      </div>
    </div>
  );

}

export default NavbarItem;
