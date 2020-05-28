import React, { useEffect, useState } from "react";
import {
  GetProfiles,
  stringToUppercase,
  UpdateProfile,
  UpdatePicture,
} from "../../../context/actions/actions";
import { Spin, Col, Button, Input } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { FileField } from "../FormData/FileField";
import { useHistory } from "react-router-dom";

export const ProfilePages = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const [editedField, setEditedField] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

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
        console.log(err);
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
      setFileList([...fileList, file]);
      setEditedField([...editedField, 8]);
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
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    }

    UpdateProfile(userData)
      .then((res) => {
        if (res.success) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setUploading(false);
    history.goBack();
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
            <FileField uploadProps={uploadProps} />

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
                      boxShadow: "0px 0px 87px -43px rgba(153,153,153,1)",
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
              loading={uploading}
              disabled={!editedField.length > 0}
              onClick={handleSubmit}
            >
              Update Data
            </Button>
          </div>
        )}
      </Col>
    </div>
  );
};
