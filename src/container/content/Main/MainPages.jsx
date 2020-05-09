import React from "react";
// import { useLocation } from "react-router-dom";
import { Card, Skeleton, Avatar, Row, Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { GetAllData } from "../../../context/actions/actions";

export const MainPages = (props) => {
  const [repos, setRepos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    GetAllData("/").then((result) => {
      setRepos(result.data);
    });
  }, []);
  return (
    <div>
      <h1>Hello</h1>
      <Row></Row>
      {repos.map((repo, i) => {
        return (
          <Col lg={8} md={12} sm={24} key={i}>
            <Card
              style={{ width: 300, marginTop: 16 }}
              actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              <Skeleton loading={true} avatar active>
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Skeleton>
            </Card>
          </Col>
        );
      })}
    </div>
  );
};
