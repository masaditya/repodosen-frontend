import React from "react";

import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";

export const FormUpdatePages = () => {
  const history = useHistory();
  const { repo } = history.location.state;
  const fields = Object.keys(history.location.state.repo);

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

  const stringToUppercase = (str) => {
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
            {console.log()}
            <Input value={repo[field]} />
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
