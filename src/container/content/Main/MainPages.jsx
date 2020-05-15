import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { Card, Skeleton, Row, Col, Divider } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { GetAllData } from "../../../context/actions/actions";
import { useHistory } from "react-router-dom";

export const MainPages = (props) => {
  const [repos, setRepos] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    GetAllData(props.location.pathname).then((res) => {
      setRepos(res.data);
      console.log(res.data.length);
      setLoading(false);
    });
  }, [props.location.pathname]);
  return (
    <div>
      <Divider
        orientation="left"
        style={{ color: "#333", fontWeight: "normal" }}
      >
        {props.location.pathname}
      </Divider>
      <Row gutter={[16, 16]}>
        {repos.map((repo, i) => {
          return (
            <Col lg={8} md={12} sm={24} key={i}>
              <Card
                actions={[
                  <EyeOutlined
                    key="detail"
                    onClick={() => history.push("/detail", { repo })}
                  />,
                  <EditOutlined
                    key="update"
                    onClick={() => history.push("/update", { repo })}
                  />,
                  <DeleteOutlined key="delete" />,
                ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    title="Card title"
                    description="This is the description"
                  />
                </Skeleton>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
