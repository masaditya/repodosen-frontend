import React from "react";

import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { stringToUppercase } from "../../../context/actions/actions";

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

  return (
    <Form {...layout} name="basic" onSubmit={onFinish}>
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
