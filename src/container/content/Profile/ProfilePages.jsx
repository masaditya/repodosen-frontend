import React, { useEffect, useState } from "react";
import {
  GetProfiles,
  stringToUppercase,
} from "../../../context/actions/actions";
import { Spin, Col } from "antd";

export const ProfilePages = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    GetProfiles().then((res) => {
      setUserData(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
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
                  padding: "1em 4em",
                  boxShadow: "0px 0px 87px -43px rgba(153,153,153,1)",
                  borderRadius: ".5em",
                  border: "0.5px solid #f0f0f0",
                }}
                key={i}
              >
                <p style={{ margin: 0 }}> {stringToUppercase(field)} </p>
                <b>{userData[field]}</b>
              </div>
            );
          })
        )}
      </Col>
    </div>
  );
};
