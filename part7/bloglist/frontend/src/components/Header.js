import React from "react";
import AuthLinks from "./AuthLinks";
import Navbar from "../shared/Navbar";
import StyledLink from "../shared/StyledLink";

function Header() {
  return (
    <Navbar>
      <div style={{ display: "flex", gap: "1em" }}>
        <StyledLink to="/">Blogs</StyledLink>
        <StyledLink to="/users">Users</StyledLink>
      </div>
      <div>
        <AuthLinks />
      </div>
    </Navbar>
  );
}

export default Header;
