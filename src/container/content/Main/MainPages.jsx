import React from "react";
// import { useLocation } from "react-router-dom";
import { Card, Skeleton, Avatar, Row, Col, Divider } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { GetAllData } from "../../../context/actions/actions";

export const MainPages = (props) => {
  const [repos, setRepos] = React.useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log(props.location.pathname);
    GetAllData(props.location.pathname).then((result) => {
      setRepos(result.data);
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
                  <EditOutlined key="edit" />,
                  <DeleteOutlined key="delete" />,
                ]}
              >
                <Skeleton loading={loading} avatar active>
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
      </Row>
    </div>
  );
};
