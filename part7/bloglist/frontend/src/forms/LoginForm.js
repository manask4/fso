import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/authReducer";

function LoginForm() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.loginForm.error);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    dispatch(login(username, password));
  };

  return (
    <div className="card login-card">
      <h1>Welcome back!</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
        <button id="login-btn" className="btn btn-success" type="submit">
          Log In
        </button>
        <div className="login-error">{error}</div>
      </form>
    </div>
  );
}

// LoginForm.propTypes = {
//   username: PropTypes.string.isRequired,
//   handleUsernameChange: PropTypes.func.isRequired,
//   password: PropTypes.string.isRequired,
//   handlePasswordChange: PropTypes.func.isRequired,
//   handleLogin: PropTypes.func.isRequired,
//   errorMessage: PropTypes.string.isRequired,
// };

export default LoginForm;
