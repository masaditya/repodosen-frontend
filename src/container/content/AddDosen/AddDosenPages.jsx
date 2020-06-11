import React, { useState } from "react";
import { Form, Input, Divider, Button, notification } from "antd";
import { CreateDosen } from "../../../context/actions/actions";
import { useHistory } from "react-router-dom";

export const AddDosenPages = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({ username: false, password: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "") {
      setError({ ...error, username: true });
    } else if (password === "") {
      setError({ ...error, password: true });
    } else {
      CreateDosen({ username, password })
        .then((res) => {
          if (res.success) {
            notification.success({
              message: res.message,
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: err.toString(),
          });
        });
    }
  };

  return (
    <Form
      wrapperCol={{ span: 16 }}
      labelCol={{ span: 6 }}
      onSubmit={handleSubmit}
    >
      <Divider orientation="left" style={{ color: "#333" }}>
        <p className="text-divider">Add Dosen</p>
      </Divider>
      <div style={{ textAlign: "left" }}>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
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
        />
      </Form.Item>

      <Button htmlType="submit" wrapperCol={{ offset: 8, span: 16 }}>
        Submit
      </Button>
    </Form>
  );
};
