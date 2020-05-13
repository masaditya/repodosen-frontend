import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";

export const FormDataPages = () => {
  const history = useHistory();

  const fields = Object.keys(history.location.state.repo);
  console.log(fields);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const str = "kategori_ijazah";

  const stringToUppercase = (str: String) => {
    const log = str.split("_").map((word) => {
      const tmp = word.charAt(0).toUpperCase() + word.slice(1);
      return tmp;
    });

    return log.join(" ");
  };

  return (
    <Form
      {...layout}
      name="basic"
      onSubmit={onFinish}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      {fields.map((field) => {
        return (
          <Form.Item
            key={field}
            label={stringToUppercase(field)}
            name={field}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
        );
      })}

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
