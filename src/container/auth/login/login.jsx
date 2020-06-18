import React, { useContext, useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { RootContext } from "../../../context/Context";
import { Login } from "../../../context/actions/actions";
import { LOGIN_SUCCESS } from "../../../context/actionTypes";
import { Link, useHistory } from "react-router-dom";

export const LoginForm = () => {
  const { dispatch } = useContext(RootContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({ username: false, password: false });

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (username === "") {
      setError({ ...error, username: true });
    } else if (password === "") {
      setError({ ...error, password: true });
    } else {
      Login(username, password).then((result) => {
        if (result.type === LOGIN_SUCCESS) {
          notification.success({
            message: "Login Successfully!",
            description: "Hello " + username + ", welcome back!",
          });
          dispatch(result);
          setLoading(false);
          history.push("/");
        } else {
          notification.error({
            message: "Login Failed!",
            description:
              "Try again, make sure you remember username and your password!",
          });
          setLoading(false);
        }
      });
    }
  };

  return (
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
          Login
        </Button>
      </Form.Item>
      <p>
        Belum punya akun? daftar <Link to="/register">disini </Link>{" "}
      </p>
    </Form>
  );
};
