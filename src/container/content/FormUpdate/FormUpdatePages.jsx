import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { Form, Input, Button, DatePicker, notification } from "antd";
import {
  stringToUppercase,
  UpdateData,
} from "../../../context/actions/actions";
import { models } from "../../../types";
import { FileField } from "../FormData/FileField";

export const FormUpdatePages = () => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [errorField, setErrorField] = useState({});

  const history = useHistory();
  const repo = history.location.state;

  const [inputText, setInputText] = useState(repo);

  const fields = Object.keys(repo);
  fields.shift();

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const uploadProps = {
    onRemove: (file, field) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      let tmp = { ...inputText };
      delete tmp[field];
      setInputText({ ...tmp });
      setFileList(newFileList);
    },
    beforeUpload: (file, index, field) => {
      setInputText({ ...inputText, [field]: file });

      let erfield = {};
      let tmp = [...fileList];
      tmp[index] = file;
      const typeFile = file.name.split(".").pop().toLowerCase();
      console.log(typeFile);
      if (
        typeFile === "jpg" ||
        typeFile === "jpeg" ||
        typeFile === "png" ||
        typeFile === "pdf"
      ) {
        erfield = Object.assign(erfield, { [field]: false });
        setFileList([...tmp]);
      } else {
        erfield = Object.assign(erfield, { [field]: true });
      }
      setErrorField({ ...errorField, ...erfield });

      console.log(errorField);
      return false;
    },
    listType: "picture",
  };

  // handle input text
  const handleChange = (e) => {
    // const tmp = Object.assign(inputText, { [e.target.name]: e.target.value });
    // setInputText(tmp);
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };

  const validateField = () => {
    const form = Object.keys(inputText);
    const input = Object.keys(inputText);
    let erfield = {};
    form.forEach((field) => {
      if (input.includes(field)) {
        if (inputText[field] !== "") {
          erfield = Object.assign(erfield, { [field]: false });
        } else {
          erfield = Object.assign(erfield, { [field]: true });
        }
      } else {
        erfield = Object.assign(erfield, { [field]: true });
      }
    });
    setErrorField({ ...errorField, ...erfield });

    if (Object.values(erfield).indexOf(true) > -1) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    if (!validateField()) {
      let formData = new FormData();
      // mengisi formData dengan text field
      Object.keys(inputText).forEach((field) => {
        if (!field.includes("file")) formData.set(field, inputText[field]);
      });
      // mengisi formData dengan file
      fileList.forEach((file) => {
        if (file) {
          console.log(file);
          formData.append("file", file);
        }
      });
      UpdateData(repo.pathname, repo[Object.keys(repo)[1]], formData).then(
        (res) => {
          // membuat toast notifikasi
          if (res.success) {
            notification.success({
              message: "Update data to repository " + repo.pathname,
              description: res.message,
            });
            setUploading(false);
            setTimeout(() => {
              history.goBack();
            }, 1000);
          } else {
            notification.error({
              message: "Update data to repository " + repo.pathname,
              description: res.message,
            });
            setUploading(false);
          }
        }
      );
    } else {
      setUploading(false);
    }
  };

  const handleDate = (e, dateString, field) => {
    console.log(e, dateString, field);
    const tmp = Object.assign(inputText, { [field]: dateString });
    setInputText(tmp);
  };

  return (
    <Form {...layout} name="basic" onSubmit={handleSubmit}>
      <div style={{ textAlign: "left" }}>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
      {fields.map((field, i) => {
        switch (models[repo.pathname.substr(1)][field]) {
          case "file":
            return (
              <Form.Item
                key={i}
                label={stringToUppercase(field)}
                validateStatus={errorField[field] ? "error" : ""}
                help={
                  errorField[field]
                    ? "File type must be (JPG, JPEG, PNG or PDF)"
                    : ""
                }
              >
                <Input disabled value={inputText[field]} name={field} />

                <FileField
                  beforeUpload={(file) =>
                    uploadProps.beforeUpload(file, i, field)
                  }
                  onRemove={(file) => uploadProps.onRemove(file, field)}
                  listType={uploadProps.listType}
                />
              </Form.Item>
            );
          case "text":
            return (
              <Form.Item
                key={i}
                label={stringToUppercase(field)}
                validateStatus={errorField[field] ? "error" : ""}
                help={errorField[field] ? "This field is required!" : ""}
              >
                <Input
                  value={inputText[field]}
                  onChange={(e) => handleChange(e)}
                  name={field}
                />
              </Form.Item>
            );

          case "number":
            return (
              <Form.Item
                key={i}
                label={stringToUppercase(field)}
                validateStatus={errorField[field] ? "error" : ""}
                help={errorField[field] ? "This field is required!" : ""}
              >
                <Input
                  type="number"
                  onChange={(e) => handleChange(e)}
                  name={field}
                  value={inputText[field]}
                />
              </Form.Item>
            );

          case "date":
            return (
              <Form.Item
                key={i}
                label={stringToUppercase(field)}
                validateStatus={errorField[field] ? "error" : ""}
                help={errorField[field] ? "This field is required!" : ""}
              >
                <DatePicker
                  name={field}
                  onChange={(e, value) => handleDate(e, value, field)}
                />
              </Form.Item>
            );
          default:
            return null;
        }
      })}

      <Form.Item {...tailLayout}>
        <Button loading={uploading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
