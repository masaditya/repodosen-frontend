import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import {
  stringToUppercase,
  UpdateData,
} from "../../../context/actions/actions";
import { models } from "../../../types";
import { FileField } from "../FormData/FileField";
import { toast } from "react-toastify";

export const FormUpdatePages = () => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

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
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file, index) => {
      let tmp = [...fileList];
      tmp[index] = file;
      console.log(tmp);
      setFileList([...tmp]);
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
      if (file) {
        console.log(file);
        formData.append("file", file);
      }
    });

    UpdateData(repo.pathname, repo[Object.keys(repo)[1]], formData).then(
      (res) => {
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
        history.goBack();
      }
    );

    // CreateData("/" + formControl, formData)
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
              <Form.Item key={i} name={field} label={stringToUppercase(field)}>
                <Input disabled value={inputText[field]} name={field} />
                <FileField
                  beforeUpload={(file) => uploadProps.beforeUpload(file, i)}
                  onRemove={(file) => uploadProps.onRemove(file)}
                  listType={uploadProps.listType}
                />
              </Form.Item>
            );
          case "text":
            return (
              <Form.Item key={i} label={stringToUppercase(field)}>
                <Input
                  value={inputText[field]}
                  onChange={(e) => handleChange(e)}
                  name={field}
                />
              </Form.Item>
            );

          case "number":
            return (
              <Form.Item key={i} label={stringToUppercase(field)}>
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
              <Form.Item key={i} label={stringToUppercase(field)}>
                {/* <DatePicker name={field} onChange={handleDate} /> */}
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
