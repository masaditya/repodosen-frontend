import React, { useState, useEffect } from "react";
import {
  Select,
  Form,
  Divider,
  Button,
  DatePicker,
  Input,
  notification,
} from "antd";
import { models } from "../../../types";
import { FileField } from "./FileField";
import {
  CreateData,
  stringToUppercase,
} from "../../../context/actions/actions";
import { useHistory } from "react-router-dom";

export const FormDataPages = () => {
  const history = useHistory();

  const prevRoute = history.location.state;
  // initialize state

  const [formControl, setFormControl] = useState(
    prevRoute === "" ? "kepangkatan" : prevRoute
  );

  const [uploading, setUploading] = useState(false);
  const [inputText, setInputText] = useState({});
  const [fileList, setFileList] = useState([]);
  const { Option } = Select;

  const [errorField, setErrorField] = useState({});

  useEffect(() => {
    setInputText({});
    setFileList([]);
  }, [formControl]);

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

      return false;
    },
    listType: "picture",
  };

  // handle input text
  const handleChange = (e) => {
    const tmp = Object.assign(inputText, { [e.target.name]: e.target.value });
    setInputText(tmp);
  };

  const validateField = () => {
    const form = Object.keys(models[formControl]);
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
        if (file) formData.append("file", file);
      });
      CreateData("/" + formControl, formData).then((res) => {
        // membuat toast notifikasi
        if (res.success) {
          notification.success({
            message: "Added new data to repository " + formControl,
            description: res.message,
          });
          setUploading(false);
          setTimeout(() => {
            history.goBack();
          }, 1000);
        } else {
          notification.error({
            message: "Added New Data to " + formControl,
            description: res.message,
          });
          setUploading(false);
        }
      });
    } else {
      setUploading(false);
    }
  };

  const handleDate = (e, dateString, field) => {
    const tmp = Object.assign(inputText, { [field]: dateString });
    setInputText(tmp);
  };

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
      <Form
        {...layout}
        encType="multipart/form-data"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Form.Item label="Tambah Data">
          <Select
            defaultValue={prevRoute === "" ? "kepangkatan" : prevRoute}
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
                  label={stringToUppercase(field)}
                  validateStatus={errorField[field] ? "error" : ""}
                  help={
                    errorField[field]
                      ? "File type must be (JPG, JPEG, PNG or PDF)"
                      : ""
                  }
                >
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
                  <Input onChange={(e) => handleChange(e)} name={field} />
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
          {/* button submit */}
          <Button loading={uploading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
