import React from "react";

import { Table, Divider, Button } from "antd";
import { stringToUppercase } from "../../../context/actions/actions";
import { useHistory } from "react-router-dom";

export const TableListPages = ({ repos, loading, pathname }) => {
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
              onClick={() => history.push("/update", { pathname, ...repo })}
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
      columns={columns}
      dataSource={data}
    />
  );
};
