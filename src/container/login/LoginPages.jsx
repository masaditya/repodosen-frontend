import React, { useState, useContext } from "react";
import { RootContext } from "../../context/Context";
import { Login } from "../../context/actions/actions";
import { LOGIN_SUCCESS } from "../../context/actionTypes";
import { Form, Input, Button, notification } from "antd";
import login_illustraion from "../../assets/undraw_authentication_fsn5.svg";

export const LoginPages = () => {
  const { dispatch } = useContext(RootContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({ username: false, password: false });

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (username === "") {
      setError({ ...error, username: true });
    } else if (password === "") {
      setError({ ...error, password: true });
    } else {
      const result = await Login(username, password);
      if (result.type === LOGIN_SUCCESS) {
        notification.success({
          message: "Login Successfully!",
          description: "Hello " + username + ", welcome back!",
        });
        dispatch(result);
        setTimeout(() => {
          window.location.reload(false);
        }, 500);
      } else {
        notification.error({
          message: "Login Failed!",
          description:
            "Try again, make sure you remember username and your password!",
        });
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-screen">
      <div className="illustration-container">
        <img className="login-illustration" src={login_illustraion} alt="" />
      </div>
      <div className="login-container">
        <Form className="m-auto" onSubmit={submitHandler}>
          <h1 className="greeting-text">
            Hello, <br /> Welcome Back!
          </h1>
          <Form.Item
            validateStatus={error.username ? "error" : ""}
            help={error.username ? "username is required!" : ""}
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              name="username"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            validateStatus={error.password ? "error" : ""}
            help={error.password ? "password is required!" : ""}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
