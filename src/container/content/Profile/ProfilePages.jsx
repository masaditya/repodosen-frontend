import React, { useEffect, useState } from "react";
import {
  GetProfiles,
  stringToUppercase,
  UpdateProfile,
  UpdatePicture,
} from "../../../context/actions/actions";
import { Spin, Col, Button, Input, Form, notification, Radio } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { FileField } from "../FormData/FileField";
import { useHistory } from "react-router-dom";

export const ProfilePages = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const [editedField, setEditedField] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errorField, setErrorField] = useState({});

  const history = useHistory();

  useEffect(() => {
    GetProfiles()
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
      });
  }, []);

  // upload profile picture props
  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      let erfield = {};

      const typeFile = file.name.split(".").pop().toLowerCase();
      if (typeFile === "jpg" || typeFile === "jpeg" || typeFile === "png") {
        erfield = Object.assign(erfield, { foto: false });
        setFileList([...fileList, file]);
        setEditedField([...editedField, 8]);
      } else {
        erfield = Object.assign(erfield, { foto: true });
      }
      setErrorField({ ...errorField, ...erfield });

      return false;
    },
    listType: "picture",
  };

  const handleSubmit = () => {
    setUploading(true);
    if (fileList.length > 0) {
      let formData = new FormData();
      fileList.forEach((file) => {
        formData.append("file", file);
      });

      UpdatePicture(formData).then((res) => {
        if (res.success) {
          notification.success({
            message: "Updated profile picture ",
            description: res.message,
          });
        } else {
          notification.error({
            message: "Updated profile picture ",
            description: res.message,
          });
        }
      });
    }

    UpdateProfile(userData)
      .then((res) => {
        if (res.success) {
          notification.success({
            message: "Updated profile data ",
            description: res.message,
          });
          setUploading(false);
          history.goBack();
          setTimeout(() => {
            history.goBack();
          }, 1000);
        } else {
          notification.error({
            message: "Updated profile data ",
            description: res.message,
          });
          setUploading(false);
        }
      })
      .catch((err) => {
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <Col lg={12} md={16} sm={24} style={{ margin: "auto" }}>
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <div>
            <img
              src={
                userData.foto !== ""
                  ? userData.foto
                  : "https://cdn4.iconfinder.com/data/icons/user-people-2/48/6-512.png"
              }
              alt="photos"
              width="150"
              style={{ borderRadius: "50%" }}
            />
            <Form.Item
              validateStatus={errorField["foto"] ? "error" : ""}
              help={
                errorField["foto"] ? "File type must be (JPG, JPEG or PNG)" : ""
              }
            >
              <FileField
                beforeUpload={(file) => uploadProps.beforeUpload(file)}
                onRemove={(file) => uploadProps.onRemove(file)}
                listType={uploadProps.listType}
              />
            </Form.Item>

            {Object.keys(userData).map((field, i) => {
              return (
                i !== 6 && ( //menghilangkan field Foto
                  <div
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1em 2em",
                      borderRadius: ".5em",
                      border: "0.5px solid #f0f0f0",
                    }}
                    key={i}
                  >
                    <p style={{ margin: 0 }}> {stringToUppercase(field)} </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {!editedField.includes(i) ? (
                        <b>{userData[field]}</b>
                      ) : field.includes("kelamin") ? (
                        <Radio.Group
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              [field]: e.target.value,
                            });
                          }}
                          value={userData[field]}
                        >
                          <Radio value="Laki laki">Laki laki</Radio>
                          <Radio value="Perempuan">Perempuan</Radio>
                        </Radio.Group>
                      ) : (
                        <Input
                          name={field}
                          type="text"
                          value={userData[field]}
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              [field]: e.target.value,
                            });
                          }}
                        />
                      )}
                      <Button
                        onClick={() => {
                          setEditedField([...editedField, i]);
                        }}
                        style={{ marginLeft: "20px" }}
                      >
                        <EditOutlined />
                      </Button>
                    </div>
                  </div>
                )
              );
            })}
            <Button
              style={{ marginTop: "20px" }}
              loading={uploading}
              disabled={!editedField.length > 0}
              onClick={handleSubmit}
              type="primary"
            >
              Update Data
            </Button>
          </div>
        )}
      </Col>
    </div>
  );
};
