import React from "react";
import PropTypes from "prop-types";

function AuthLinks({ user, handleLogout }) {
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

AuthLinks.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default AuthLinks;
