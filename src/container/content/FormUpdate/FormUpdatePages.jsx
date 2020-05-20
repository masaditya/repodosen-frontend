import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { stringToUppercase } from "../../../context/actions/actions";

export const FormUpdatePages = () => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const history = useHistory();
  const repo = history.location.state;

  const [inputText, setInputText] = useState(repo);

  const fields = Object.keys(repo);
  fields.shift();
  console.log(inputText);
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

    // CreateData("/" + formControl, formData).then((res) => {
    //   // membuat toast notifikasi
    //   if (res.success) {
    //     toast.success(res.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //   } else {
    //     toast.error(res.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //   }

    //   // set loading
    //   setUploading(false);
    // });
  };

  return (
    <Form {...layout} name="basic" onSubmit={handleSubmit}>
      {fields.map((field) => {
        return (
          <Form.Item
            key={field}
            label={stringToUppercase(field)}
            name={field}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            {console.log()}
            <Input
              value={inputText[field]}
              onChange={(e) =>
                setInputText({ ...inputText, [field]: e.target.value })
              }
            />
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
