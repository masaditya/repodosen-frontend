import React, { useState, useContext } from "react";
import { RootContext } from "../../context/Context";
import { Login } from "../../context/actions/actions";
import { toast } from "react-toastify";
import { LOGIN_SUCCESS } from "../../context/actionTypes";
import { Form, Input, Button } from "antd";
import login_illustraion from "../../assets/undraw_authentication_fsn5.svg";

export const LoginPages = () => {
  const { dispatch } = useContext(RootContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    //

    const result = await Login(username, password);
    if (result.type === LOGIN_SUCCESS) {
      toast.success("Hello, Welcome back !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(result);
    } else {
      toast.error("Invalid Credentials", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              name="username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        {/* <form className="m-auto" onSubmit={submitHandler}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            name="username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            name="password"
          />
          <button type="submit">Login</button>
        </form> */}
      </div>
    </div>
  );
};
