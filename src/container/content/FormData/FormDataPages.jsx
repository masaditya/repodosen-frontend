import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Select, Form, Divider, Button, Input, Upload } from "antd";
import { models } from "../../../types";

export const FormDataPages = () => {
  const [formControl, setFormControl] = useState(models.kepangkatan);
  const [fileList, setFileList] = useState([]);

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

  const stringToUppercase = (str) => {
    const log = str.split("_").map((word) => {
      const tmp = word.charAt(0).toUpperCase() + word.slice(1);
      return tmp;
    });
    return log.join(" ");
  };

  const formHandlerChange = (e) => {
    if (Array.isArray(e)) {
      console.log(e);
    }
    console.log(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <>
      <Form {...layout} onSubmit={(e) => handleSubmit(e)}>
        <Form.Item label="Tambah Data">
          <Select
            defaultValue="kepangkatan"
            style={{ width: 150 }}
            onChange={handleChange}
          >
            <Option value="kepangkatan">Kepangkatan</Option>
            <Option value="pendidikan">Pendidikan</Option>
            <Option value="pengabdian">Pengabdian</Option>
            <Option value="pengajaran">Pengajaran</Option>
            <Option value="sertifikasi">Sertifikasi</Option>
          </Select>
        </Form.Item>

        <Divider></Divider>
        {Object.keys(formControl).map((field, i) => {
          switch (formControl[field]) {
            case "file":
              return (
                <Form.Item
                  key={i}
                  name={field}
                  label={stringToUppercase(field)}
                >
                  <Upload
                    action={null}
                    name={field}
                    listType="picture"
                    onChange={(e) => formHandlerChange(e)}
                    beforeUpload={(file) => {
                      console.log(file);
                      setFileList([...fileList, file]);
                    }}
                  >
                    <Button>Click to upload</Button>
                  </Upload>
                </Form.Item>
              );
            case "text":
              return (
                <Form.Item key={i} label={stringToUppercase(field)}>
                  <Input name={field} />
                </Form.Item>
              );
            default:
              break;
          }
        })}
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
