import React, { useState } from "react";
import { Select, Form, Divider, Button, DatePicker, Input } from "antd";
import { models } from "../../../types";
import { FileField } from "./FileField";
import {
  CreateData,
  stringToUppercase,
} from "../../../context/actions/actions";
import { toast } from "react-toastify";

export const FormDataPages = () => {
  // initialize state
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

  // handle input file
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

  // handle input text
  const handleChange = (e) => {
    const tmp = Object.assign(inputText, { [e.target.name]: e.target.value });
    setInputText(tmp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);

    let formData = new FormData();

    // mengisi formData dengan text field
    Object.keys(inputText).forEach((field) => {
      formData.set(field, inputText[field]);
    });

    // mengisi formData dengan file
    fileList.forEach((file) => {
      formData.append("file", file);
    });

    CreateData("/" + formControl, formData).then((res) => {
      // membuat toast notifikasi
      if (res.success) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      // set loading
      setUploading(false);
    });
  };

  const handleDate = (e, dateString) => {
  };

  return (
    <>
      <Form
        {...layout}
        encType="multipart/form-data"
        onSubmit={(e) => handleSubmit(e)}
      >

        
        <Form.Item label="Tambah Data">
          <Select
            defaultValue="kepangkatan"
            style={{ width: 150 }}
            onChange={(e) => setFormControl(e)}
          >
            <Option value="kepangkatan">Kepangkatan</Option>
            <Option value="pendidikan">Pendidikan</Option>
            <Option value="penelitian">Penelitian</Option>
            <Option value="pengabdian">Pengabdian</Option>
            <Option value="pengajaran">Pengajaran</Option>
            <Option value="pelatihan">Pelatihan</Option>
            <Option value="sertifikasi">Sertifikasi</Option>
          </Select>
        </Form.Item>

        <Divider></Divider>

        {Object.keys(models[formControl]).map((field, i) => {
          // switch input tipe text, file, number, date ?

          switch (models[formControl][field]) {
            case "file":
              return (
                <Form.Item
                  key={i}
                  name={field}
                  label={stringToUppercase(field)}
                >
                  <FileField uploadProps={uploadProps} />
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
              return null;
          }
        })}

        <Form.Item {...tailLayout}>
          {/* button submit */}
          <Button loading={uploading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
