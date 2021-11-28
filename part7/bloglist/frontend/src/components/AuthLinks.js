import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/authReducer";

function AuthLinks() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="auth">
      <span className="logged-in">{user.name}</span>
      {user !== null && (
        <span onClick={handleLogout} className="log-out-link">
          Logout
        </span>
      )}
    </div>
  );
}

export default AuthLinks;
