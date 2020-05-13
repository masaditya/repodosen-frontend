import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";

export const FormDataPages = () => {
  const { Option } = Select;

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

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };ForFormDataPagesFormDataPagesmDataPages

  const stringToUppercase = (str) => {
    const log = str.split("_").map((word) => {
      const tmp = word.charAt(0).toUpperCase() + word.slice(1);
      return tmp;
    });
    return log.join(" ");
  };
  // const [form] = Form.useForm();

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        // form.setFieldsValue({ note: "Hi, man!" });
        return;
      case "female":
        // form.setFieldsValue({ note: "Hi, lady!" });
        return;
      case "other":
        // form.setFieldsValue({ note: "Hi there!" });
        return;
      default:
        return;
    }
  };

  return (
    <Form {...layout} name="basic" onSubmit={onFinish}>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) => {
          return getFieldValue("gender") === "other" ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
