import React, { useState } from "react";
import { Form, Input } from "antd";
import { models } from "../../../types";
import { stringToUppercase } from "../../../context/actions/actions";

export const AddDosenPages = () => {
  // Layout
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Form {...layout}>
      {Object.keys(models.dosen).map((field, i) => {
        return (
          <Form.Item key={i} label={stringToUppercase(field)}>
            <Input name={field} />
          </Form.Item>
        );
      })}
    </Form>
  );
};
