import React, { useEffect, useState } from "react";
import {
  GetProfiles,
  stringToUppercase,
} from "../../../context/actions/actions";
import { Spin, Col, Button, Input } from "antd";

import { EditOutlined } from "@ant-design/icons";

export const ProfilePages = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const [editedField, setEditedField] = useState([]);

  useEffect(() => {
    GetProfiles().then((res) => {
      setUserData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Col lg={12} md={16} sm={24} style={{ margin: "auto" }}>
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          Object.keys(userData).map((field, i) => {
            return (
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
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {!editedField.includes(i) ? (
                    <b>{userData[field]}</b>
                  ) : (
                    <Input
                      name={field}
                      type="text"
                      value={userData[field]}
                      onChange={(e) => {
                        setUserData({ ...userData, [field]: e.target.value });
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
            );
          })
        )}
      </Col>
      <Button onClick={() => console.log(userData)}>Update Data</Button>
    </div>
  );
};
