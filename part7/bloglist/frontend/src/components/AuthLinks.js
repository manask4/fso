import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/authReducer";
import StyledLink from "../shared/StyledLink";
import { useNavigate } from "react-router-dom";

function AuthLinks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const userStyle = {
    color: "#FFF176",
    fontWeight: "bold",
    marginRight: "5px",
  };

  return (
    <div className="auth">
      {user !== null && (
        <>
          <span style={userStyle}>{user.name}</span>
          <StyledLink to="#" onClick={handleLogout}>
            Logout
          </StyledLink>
        </>
      )}
    </div>
  );
}

export default AuthLinks;
