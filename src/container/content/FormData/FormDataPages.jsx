import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Select, Form, Divider, Button, DatePicker, Input } from "antd";
import { models } from "../../../types";
import { FileField } from "./FileField";
import {
  CreateData,
  stringToUppercase,
} from "../../../context/actions/actions";

export const FormDataPages = () => {
  const [formControl, setFormControl] = useState("kepangkatan");
  const [uploading, setUploading] = useState(false);

  const [inputText, setInputText] = useState({});
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

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);

      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  //

  const handleChange = (e) => {
    const tmp = Object.assign(inputText, { [e.target.name]: e.target.value });
    setInputText(tmp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();

    // mengisi formData dengan text field
    Object.keys(inputText).map((field) => {
      formData.set(field, inputText[field]);
      console.log(field, inputText[field]);
    });

    // mengisi formData dengan file
    // fileList.forEach((file) => {
    formData.append("files", fileList);
    console.log(fileList);
    // });

    CreateData("/" + formControl, formData).then((res) => {
      console.log(res);
      setUploading(false);
    });
  };

  const handleFiles = (e) => {
    const newFile = e.target.files[0];
    console.log(fileList)
  };

  const handleDate = (e, dateString) => {
    console.log(e);
    console.log(dateString);
  };

  return (
    <>
      <Form {...layout} onSubmit={(e) => handleSubmit(e)}>
        <Form.Item label="Tambah Data">
          <Select
            defaultValue="kepangkatan"
            style={{ width: 150 }}
            onChange={(e) => setFormControl(e)}
          >
            <Option value="kepangkatan">Kepangkatan</Option>
            <Option value="pendidikan">Pendidikan</Option>
            <Option value="pengabdian">Pengabdian</Option>
            <Option value="pengajaran">Pengajaran</Option>
            <Option value="sertifikasi">Sertifikasi</Option>
          </Select>
        </Form.Item>

        <Divider></Divider>
        {Object.keys(models[formControl]).map((field, i) => {
          switch (models[formControl][field]) {
            case "file":
              return (
                <Form.Item
                  key={i}
                  name={field}
                  label={stringToUppercase(field)}
                >
                  {/* <FileField uploadProps={uploadProps} /> */}
                  <input
                    name={field}
                    type="file"
                    onChange={(e) => handleFiles(e)}
                  />
                </Form.Item>
              );
            case "text":
              return (
                <Form.Item key={i} label={stringToUppercase(field)}>
                  <Input onChange={(e) => handleChange(e)} name={field} />
                </Form.Item>
              );

            case "number":
              return (
                <Form.Item key={i} label={stringToUppercase(field)}>
                  <Input
                    type="number"
                    onChange={(e) => handleChange(e)}
                    name={field}
                  />
                </Form.Item>
              );

            case "date":
              return (
                <Form.Item key={i} label={stringToUppercase(field)}>
                  <DatePicker name={field} onChange={handleDate} />
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
