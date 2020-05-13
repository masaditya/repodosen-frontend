import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Select, Form, Divider, Button, Input, Upload } from "antd";
import { models } from "../../../types";

export const FormDataPages = () => {
  const [formControl, setFormControl] = useState(models.kepangkatan);
  const { Option } = Select;

  // Layout
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const handleChange = (value) => {
    console.log(models[value]);
    setFormControl(models[value]);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <Form {...layout}>
        <Form.Item label="Tambah Data">
          <Select style={{ width: 150 }} onChange={handleChange}>
            <Option value="kepangkatan">Kepangkatan</Option>
            <Option value="pendidikan">Pendidikan</Option>
            <Option value="pengabdian">Pengabdian</Option>
            <Option value="pengajaran">Pengajaran</Option>
            <Option value="sertifikasi">Sertifikasi</Option>
          </Select>
        </Form.Item>

        <Divider></Divider>
        {Object.keys(formControl).map((field, i) => {
          return (
            <Form.Item key={i} label={field}>
              <Input type={formControl[field]} />
            </Form.Item>
          );
        })}

        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
