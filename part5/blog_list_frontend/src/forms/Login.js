import React from "react";
import PropTypes from "prop-types";

function Login({
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  handleLogin,
  errorMessage,
}) {
  return (
    <div className="card login-card">
      <h1>Welcome back!</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => handleUsernameChange(e.target.value)}
            value={username}
            id="username"
            type="text"
            name="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={password}
            id="password"
            type="password"
            name="password"
          />
        </div>
        <button className="btn btn-success" type="submit">
          Log In
        </button>
        <div className="login-error">{errorMessage}</div>
      </form>
    </div>
  );
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default Login;
