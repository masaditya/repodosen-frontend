import React, { useContext } from "react";

import { Table, Divider, Button, Modal, notification } from "antd";
import {
  stringToUppercase,
  DeteleData,
  DeleteDosen,
} from "../../../context/actions/actions";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { RootContext } from "../../../context/Context";

const { confirm } = Modal;

export const TableListPages = ({ repos, loading, pathname }) => {
  let match = useRouteMatch("/user/dosen");
  const { state } = useContext(RootContext);
  const history = useHistory();
  let field = Object.keys(repos[0]);
  const columns = [
    {
      title: field[2] && stringToUppercase(field[2]),
      dataIndex: field[2],
      key: field[2],
    },
    {
      title: field[3] && stringToUppercase(field[3]),
      dataIndex: field[3],
      key: field[3],
    },
    {
      title: field[4] && stringToUppercase(field[4]),
      dataIndex: field[4],
      key: field[4],
      render: (props) => {
        if (field[4] && field[4].includes("file")) {
          return (
            <Button onClick={() => window.open(repos[field[4]], "_blank")}>
              Show Files
            </Button>
          );
        } else {
          return <p> {props && props.toString()} </p>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (repo, record) => {
        return (
          <span>
            <Button
              type="default"
              onClick={() => history.push("/detail", { repo })}
            >
              Details
            </Button>
            {!pathname.includes("user/dosen") && (
              <>
                <Divider type="vertical" />
                <Button
                  type="primary"
                  onClick={() => history.push("/update", { pathname, ...repo })}
                >
                  Update
                </Button>
              </>
            )}

            <Divider type="vertical" />
            <Button
              type="danger"
              onClick={() => {
                console.log(match);
                if (match) {
                  showConfirmDosen(repo);
                } else {
                  showConfirm(repo);
                }
              }}
            >
              Delete
            </Button>
          </span>
        );
      },
    },
  ];

  const columnsAdmin = [
    {
      title: field[1] && stringToUppercase(field[1]),
      dataIndex: field[1],
      key: field[1],
    },
    {
      title: field[2] && stringToUppercase(field[2]),
      dataIndex: field[2],
      key: field[2],
    },
    {
      title: field[3] && stringToUppercase(field[3]),
      dataIndex: field[3],
      key: field[3],
    },
    {
      title: field[4] && stringToUppercase(field[4]),
      dataIndex: field[4],
      key: field[4],
      render: (props) => {
        if (field[4] && field[4].includes("file")) {
          return (
            <Button
              onClick={() => {
                window.open(props, "_blank");
              }}
            >
              Show Files
            </Button>
          );
        } else {
          return <p> {props && props.toString()} </p>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (repo, record) => {
        return (
          <span>
            <Button
              type="default"
              onClick={() => history.push("/detail", { repo })}
            >
              Details
            </Button>
            {!pathname.includes("user/dosen") && (
              <>
                <Divider type="vertical" />
                <Button
                  type="primary"
                  onClick={() => history.push("/update", { pathname, ...repo })}
                >
                  Update
                </Button>
              </>
            )}

            <Divider type="vertical" />
            <Button
              type="danger"
              onClick={() => {
                console.log(match);
                if (match) {
                  showConfirmDosen(repo);
                } else {
                  showConfirm(repo);
                }
              }}
            >
              Delete
            </Button>
          </span>
        );
      },
    },
  ];

  const data = [...repos];

  return (
    <Table
      rowKey={(record, index) => {
        return index + 1;
      }}
      loading={loading}
      columns={state.isAdmin ? columnsAdmin : columns}
      dataSource={data}
    />
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
          notification.success({
            message: "Deleted data from " + pathname,
            description: res.message,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else {
          notification.error({
            message: "Deleted data from " + pathname,
            description: res.message,
          });
        }
      });
    },
    onCancel() {},
  });
};

const showConfirmDosen = (repo) => {
  confirm({
    title: "Do you Want to delete these Dosen?",
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
