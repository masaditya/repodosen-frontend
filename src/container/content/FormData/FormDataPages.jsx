import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Select, Form, Divider, Button, Input, Upload } from "antd";
import { models } from "../../../types";
import { FileField } from "./FileField";
import Axios from "axios";
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

  //

  const handleChange = (e) => {
    const tmp = Object.assign(inputText, { [e.target.name]: e.target.value });
    setInputText(tmp);
  };

  const handleUpload = () => {
    // const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
      console.log(fileList);
    });

    setUploading(true);
    // You can use any AJAX library you like
    // reqwest({
    //   url: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    //   method: "post",
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success("upload successfully.");
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error("upload failed.");
    //   },
    // });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);

    CreateData("/" + formControl, { ...inputText, fileList }).then((res) => {
      console.log(res);
      setUploading(false);
    });
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
                  <FileField
                    showUploadList={false}
                    fileList={fileList}
                    uploading={uploading}
                    handleUpload={handleUpload}
                    uploadProps={uploadProps}
                  />
                </Form.Item>
              );
            case "text":
              return (
                <Form.Item key={i} label={stringToUppercase(field)}>
                  <Input onChange={(e) => handleChange(e)} name={field} />
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
