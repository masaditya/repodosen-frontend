import React from "react";
import { Col, Card, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { DeteleData } from "../../context/actions/actions";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const RepoItems = ({ repos = [], loading }) => {
  const history = useHistory();

  return (
    <>
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
                <DeleteOutlined
                  key="delete"
                  onClick={() => {
                    showConfirm(repo);
                  }}
                />,
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
    </>
  );
};

const showConfirm = (repo) => {
  confirm({
    title: "Do you Want to delete these items?",
    icon: <ExclamationCircleOutlined />,
    onOk() {
      const firstField = Object.keys(repo)[0]; // id_pelatihan
      const pathname = firstField.split("_")[1]; // pelatihan
      const id = repo[firstField]; // id : 5
      DeteleData(pathname, id).then((res) => {
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.success(res.message);
        }
      });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
