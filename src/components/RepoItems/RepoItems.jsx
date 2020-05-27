import React, { useContext } from "react";
import { Col, Card, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { DeteleData } from "../../context/actions/actions";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { RootContext } from "../../context/Context";

const { confirm } = Modal;

export const RepoItems = ({ repos = [], loading, pathname }) => {
  const { state } = useContext(RootContext);

  const history = useHistory();

  let actionsButton = (repo) => {
    let buttons = [
      <EyeOutlined
        key="detail"
        onClick={() => history.push("/detail", { repo })}
      />,
      <EditOutlined
        key="update"
        onClick={() => history.push("/update", { pathname, ...repo })}
      />,
      <DeleteOutlined
        key="delete"
        onClick={() => {
          showConfirm(repo);
        }}
      />,
    ];

    if (state.isAdmin) {
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
    onCancel() {},
  });
};
