import React, { useState } from "react";
import { Form, Input, Button, notification, Radio } from "antd";
import { stringToUppercase, Register } from "../../../context/actions/actions";
import { Link, useHistory } from "react-router-dom";
import { models } from "../../../types";

export const RegisterForm = () => {
  const [inputText, setInputText] = useState({});
  const [errorField, setErrorField] = useState({});
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    const tmp = Object.assign(inputText, { [e.target.name]: e.target.value });
    setInputText(tmp);
  };

  const validateField = () => {
    const form = Object.keys(models.dosen);
    const input = Object.keys(inputText);
    let erfield = {};
    form.forEach((field) => {
      if (input.includes(field)) {
        if (inputText[field] !== "") {
          erfield = Object.assign(erfield, { [field]: false });
        } else {
          erfield = Object.assign(erfield, { [field]: true });
        }
      } else {
        erfield = Object.assign(erfield, { [field]: true });
      }
    });
    setErrorField({ ...errorField, ...erfield });

    if (Object.values(erfield).indexOf(true) > -1) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputText);
    setLoading(true);

    if (!validateField()) {
      Register(inputText).then((res) => {
        // membuat toast notifikasi
        if (res.success) {
          notification.success({
            message: "Register",
            description: res.message,
          });
          setLoading(false);
          setTimeout(() => {
            history.goBack();
          }, 1000);
        } else {
          notification.error({
            message: "Regiser",
            description: res.message,
          });
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ textAlign: "left", paddingTop: "20px", paddingBottom: "30px" }}
      className="m-auto"
    >
      <h1 className="greeting-text">Register to getting started!</h1>

      {Object.keys(models.dosen).map((field, i) => {
        switch (models.dosen[field]) {
          case "text":
            return (
              <Form.Item
                key={i}
                style={{ marginBottom: 0 }}
                validateStatus={errorField[field] ? "error" : ""}
                help={errorField[field] ? "This field is required!" : ""}
                label={stringToUppercase(field)}
              >
                <Input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name={field}
                  disabled={loading}
                />
              </Form.Item>
            );
          case "radio":
            return (
              <Form.Item
                key={i}
                style={{ marginBottom: 0 }}
                validateStatus={errorField[field] ? "error" : ""}
                help={errorField[field] ? "This field is required!" : ""}
                label={stringToUppercase(field)}
              >
                <Radio.Group
                  name={field}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <Radio value="Laki laki">Laki laki</Radio>
                  <Radio value="Perempuan">Perempuan</Radio>
                </Radio.Group>
              </Form.Item>
            );
          case "password":
            return (
              <Form.Item
                key={i}
                style={{ marginBottom: 0 }}
                validateStatus={errorField[field] ? "error" : ""}
                help={errorField[field] ? "This field is required!" : ""}
                label={stringToUppercase(field)}
              >
                <Input
                  onChange={(e) => handleChange(e)}
                  type="password"
                  name={field}
                  disabled={loading}
                />
              </Form.Item>
            );
          default:
            return null;
        }
      })}

      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>

      <p>
        Sudah punya akun? masuk <Link to="/login">disini </Link>{" "}
      </p>
    </Form>
  );
};
