import React from "react";

import { Form, Input, Button, notification } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChangePassword } from "../../../context/actions/actions";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

export const ChangePasswordPages = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confimPassword, setConfimPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();

  const validator = () => {
    return newPassword === confimPassword;
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (validator()) {
      setError(false);
      ChangePassword(oldPassword, newPassword).then((res) => {
        if (res.success) {
          notification.success({
            message: res.message,
          });
          setLoading(false);
          setTimeout(() => {
            history.push("/");
          }, 1000);
        } else {
          notification.error({
            message: res.message,
          });
          setLoading(false);
        }
      });
    } else {
      setError(true);
      setLoading(false);
    }
  };
  return (
    <Form {...layout} onSubmit={handleSubmit}>
      <div style={{ textAlign: "left" }}>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
      <Form.Item
        label="Old Password"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input.Password
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          disabled={loading}
        />
      </Form.Item>
      <Form.Item
        validateStatus={error ? "error" : "success"}
        help={error ? "Password Tidak sesuai" : ""}
        label="New Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
        />
      </Form.Item>
      <Form.Item
        validateStatus={error ? "error" : "success"}
        help={error ? "Password Tidak sesuai" : ""}
        label="Confirm New Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          value={confimPassword}
          onChange={(e) => setConfimPassword(e.target.value)}
          disabled={loading}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          loading={loading}
          disabled={loading}
          type="primary"
          htmlType="submit"
        >
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};
