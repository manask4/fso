import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/authReducer";
import FormGroup from "../shared/FormGroup";
import FormInputLabel from "../shared/FormInputLabel";
import FormInput from "../shared/FormInput";
import Button from "../shared/Button";
import Title from "../shared/Title";
import Card from "../shared/Card";

function LoginForm() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.loginForm.error);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    dispatch(login(username, password));
  };

  const errorStyle = {
    color: "#f44336",
    marginTop: "1em",
  };

  return (
    <Card>
      <Title>Welcome back!</Title>
      <form onSubmit={handleLogin}>
        <FormGroup>
          <FormInputLabel htmlFor="username">Username</FormInputLabel>
          <FormInput id="username" type="text" name="username" />
        </FormGroup>
        <FormGroup>
          <FormInputLabel htmlFor="password">Password</FormInputLabel>
          <FormInput id="password" type="password" name="password" />
        </FormGroup>
        <Button id="login-btn" primary type="submit">
          Log In
        </Button>
        <div id="login-error" style={errorStyle}>{error}</div>
      </form>
    </Card>
  );
}

export default LoginForm;
