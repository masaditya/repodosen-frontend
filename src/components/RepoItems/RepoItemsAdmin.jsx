import React from "react";
import { Col, Card, Skeleton, notification, Avatar } from "antd";
import Meta from "antd/lib/card/Meta";
import {
  DeleteOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { DeleteDosen } from "../../context/actions/actions";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const RepoItemsAdmin = ({ repos = [], loading, pathname = "" }) => {
  const history = useHistory();

  let actionsButton = (repo) => {
    let buttons = [
      <EyeOutlined
        key="detail"
        onClick={() => history.push("/detail", { repo })}
      />,
      <DeleteOutlined
        key="delete"
        onClick={() => {
          showConfirmDosen(repo);
        }}
      />,
    ];

    if (!pathname.includes("user")) {
      buttons.splice(1, 1);
    }
    return buttons;
  };

  return (
    <>
      {repos.map((repo, i) => {
        return (
          <Col lg={8} md={12} sm={24} key={i}>
            <Card actions={actionsButton(repo)}>
              <Skeleton loading={loading} avatar active>
                <Meta
                  title={repo[Object.keys(repo)[2]]}
                  description={repo[Object.keys(repo)[3]]}
                  avatar={
                    pathname.includes("dosen") ? (
                      repo.isVerified ? (
                        <Avatar
                          style={{ backgroundColor: "#87d068" }}
                          icon={<CheckOutlined />}
                        />
                      ) : (
                        <Avatar
                          style={{ backgroundColor: "#e74c3c" }}
                          icon={<CloseOutlined />}
                        />
                      )
                    ) : (
                      ""
                    )
                  }
                />
              </Skeleton>
            </Card>
          </Col>
        );
      })}
    </>
  );
};

const showConfirmDosen = (repo) => {
  confirm({
    title: "Do you Want to delete these items?",
    icon: <ExclamationCircleOutlined />,
    onOk() {
      const firstField = Object.keys(repo)[0]; // id_pelatihan
      const id = repo[firstField]; // id : 5
      DeleteDosen(id).then((res) => {
        if (res.success) {
          notification.success({
            message: "Deleted data from ",
            description: res.message,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else {
          notification.error({
            message: "Deleted data from ",
            description: res.message,
          });
        }
      });
    },
    onCancel() {},
  });
};
